#!/usr/bin/env bash
# ============================================================
#  publicar.sh — publica um ciclo da Plataforma Teacher Lu
#  Uso:   bash publicar.sh "mensagem do commit"
#         bash publicar.sh            (pede a mensagem na hora)
#
#  Etapas: 1) validação  2) commit  3) push  4) GitHub Pages
#          5) confirmação (hash) + URL pública
#  Fail-fast: qualquer falha interrompe tudo e explica o motivo.
# ============================================================

set -u

# ---- utilidades ----
fail(){ echo ""; echo "❌ ERRO: $1"; echo "   Processo interrompido — nenhuma etapa seguinte foi executada."; exit 1; }
step(){ echo ""; echo "▶ $1"; }

# roda a partir da pasta do próprio script
cd "$(dirname "$0")" 2>/dev/null || fail "Não consegui entrar na pasta do projeto."
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || fail "Esta pasta não é um repositório git."
git remote get-url origin >/dev/null 2>&1 || fail "Remote 'origin' não configurado."

# mensagem do commit (argumento ou perguntada na hora)
MSG="${1:-}"
if [ -z "$MSG" ]; then
  printf "Mensagem do commit: "
  read -r MSG
fi
[ -z "$MSG" ] && fail "Mensagem de commit vazia — nada foi feito."

echo "============================================================"
echo " Publicando ciclo — Plataforma Teacher Lu"
echo "============================================================"

# ---- limpeza de locks órfãos (seguros de remover: não há git rodando) ----
for L in .git/HEAD.lock .git/index.lock .git/objects/maintenance.lock; do
  [ -e "$L" ] && rm -f "$L" 2>/dev/null && echo "  • lock órfão removido: $L"
done

# ============================================================
# 1) VALIDAÇÃO BÁSICA (quando aplicável — precisa do Node)
# ============================================================
step "1/5 · Validação básica"
if command -v node >/dev/null 2>&1; then
  for f in engine/*.js; do
    [ -f "$f" ] || continue
    node --check "$f" >/dev/null 2>&1 || fail "Sintaxe inválida em $f"
    echo "  ✓ $f"
  done
  for h in grammar.html speaking.html lessons.html index.html; do
    [ -f "$h" ] || continue
    node -e 'const fs=require("fs"),vm=require("vm");
      const html=fs.readFileSync(process.argv[1],"utf8");
      const code=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join("\n");
      if(code.trim()){ try{ new vm.Script(code); }catch(e){ console.error(e.message); process.exit(1); } }' "$h" \
      || fail "Sintaxe inválida no <script> de $h"
    echo "  ✓ $h"
  done
  echo "  ✓ validação concluída"
else
  echo "  ⚠ Node não encontrado — validação de sintaxe pulada (etapa opcional)."
fi

# ============================================================
# 2) COMMIT
# ============================================================
step "2/5 · Commit"
git add -A || fail "Falha ao preparar as alterações (git add)."
if git diff --cached --quiet; then
  echo "  ⚠ Nada novo para commitar."
  if git status -sb | grep -q "ahead"; then
    echo "  • Há commit(s) local(is) ainda não publicado(s) — seguindo para o push."
  else
    fail "Não há alterações novas nem commits pendentes para publicar."
  fi
else
  git commit -m "$MSG" || fail "Falha ao criar o commit."
  echo "  ✓ commit criado"
fi

# ============================================================
# 3) PUSH
# ============================================================
step "3/5 · Push para o repositório remoto"
BR="$(git rev-parse --abbrev-ref HEAD)"
git push origin "$BR" || fail "Falha no push. Verifique seu login no GitHub e a conexão de rede."
echo "  ✓ enviado para origin/$BR"

# ============================================================
# 4) GITHUB PAGES (atualiza automaticamente no push; aqui confirmamos)
# ============================================================
step "4/5 · GitHub Pages"
SLUG="$(git remote get-url origin | sed -E 's#(git@github.com:|https://github.com/)##; s#\.git$##')"
OWNER="${SLUG%%/*}"; REPO="${SLUG##*/}"
BASE="https://${OWNER}.github.io/${REPO}"
PUBLIC_URL="${BASE}/grammar.html"

if command -v curl >/dev/null 2>&1; then
  echo "  Aguardando o build do Pages (pode levar ~1–2 min)..."
  OK=""
  for i in $(seq 1 24); do
    CODE="$(curl -s -o /dev/null -w '%{http_code}' "$BASE/index.html")"
    if [ "$CODE" = "200" ]; then OK="1"; echo "  ✓ Pages respondeu 200 OK"; break; fi
    if [ "$CODE" = "404" ] && [ "$i" -ge 6 ]; then
      echo "  ⚠ Pages retornou 404. Se for a primeira vez, ative em: Settings → Pages → Deploy from a branch → main / root."
      break
    fi
    sleep 5
  done
  [ -z "$OK" ] && echo "  ⚠ O Pages ainda pode estar atualizando — o push já foi feito; confira a URL em instantes."
else
  echo "  ⚠ curl não encontrado — pulei a checagem automática do Pages (o push já foi feito)."
fi

# ============================================================
# 5) CONFIRMAÇÃO — hash + URL pública
# ============================================================
HASH="$(git rev-parse --short HEAD)"
echo ""
echo "============================================================"
echo "✅ PUBLICADO COM SUCESSO"
echo "   Commit:  $HASH"
echo "   Branch:  $BR"
echo "   Mensagem: $MSG"
echo ""
echo "   🌐 URL pública para os testes:"
echo "      $PUBLIC_URL"
echo "      (Grammar já com cache-busting ?v=…; se preciso, force refresh com Ctrl+F5)"
echo "============================================================"
