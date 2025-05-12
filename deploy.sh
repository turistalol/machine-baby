#!/bin/bash

echo "🚀 Iniciando deploy do Machine Baby..."

# Puxa as alterações mais recentes
echo "📥 Atualizando o código fonte..."
git pull

# Constrói e inicia os containers
echo "🏗️ Construindo e iniciando os containers..."
docker compose down
docker compose build --no-cache
docker compose up -d

# Verifica o status
echo "🔍 Verificando status dos containers..."
docker compose ps

echo "✅ Deploy concluído! Site disponível em https://machinebaby.f5.marketing" 