<div align="center">

# 🧊 SmartFridge

### Gerencie sua geladeira e gere receitas com Inteligência Artificial

[![Angular](https://img.shields.io/badge/Angular-18-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-2.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[Demo ao Vivo](https://smart-fridge-lac.vercel.app/dashboard) · [Reportar Bug](https://github.com/diegocorte1771/SmartFridge/issues) · [Solicitar Feature](https://github.com/diegocorte1771/SmartFridge/issues)

</div>

---

## 📋 Sobre o Projeto

O **SmartFridge** é uma aplicação full-stack que transforma a gestão da sua geladeira em uma experiência inteligente. Cadastre alimentos, acompanhe validades e quantidade em estoque, e deixe a IA gerar receitas personalizadas com os ingredientes que você já tem em casa.

### ✨ Funcionalidades

- **📦 Gestão de Inventário** — Adicione, edite e remova alimentos com nome, quantidade, categoria e data de validade
- **⚠️ Alertas de Validade** — Indicadores visuais para itens vencidos, prestes a vencer (3 dias) e em estoque baixo
- **🤖 Receitas com IA** — Geração automática de receitas pelo Google Gemini com base nos seus ingredientes atuais
- **🌍 Multilíngue** — Interface completa em Português (BR) e Inglês
- **🌙 Tema Escuro/Claro** — Toggle de tema com persistência via localStorage
- **📊 Dashboard** — Painel com métricas: total de itens, a vencer, categorias e estoque baixo

---

## 🛠️ Tecnologias

### Frontend
| Tecnologia | Versão | Uso |
|---|---|---|
| Angular | 18 | Framework principal |
| Angular Material | 18 | Componentes de UI |
| ngx-translate | 17 | Internacionalização (i18n) |
| TypeScript | 5.5 | Linguagem |
| RxJS | 7.8 | Programação reativa |

### Backend
| Tecnologia | Versão | Uso |
|---|---|---|
| Spring Boot | 3.5 | Framework principal |
| Spring WebFlux | — | Chamadas HTTP reativas ao Gemini |
| Spring Data JPA | — | Persistência de dados |
| Flyway | — | Migrações de banco de dados |
| H2 Database | — | Banco de dados embarcado |
| Lombok | — | Redução de boilerplate |
| Google Gemini AI | 2.5 Flash Lite | Geração de receitas |

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [Java](https://www.java.com/) 17+
- [Maven](https://maven.apache.org/) 3.8+
- Chave de API do [Google Gemini](https://aistudio.google.com/app/apikey)

### 1. Clone o repositório

```bash
git clone https://github.com/diegocorte1771/SmartFridge.git
cd SmartFridge
```

### 2. Configure o Backend

```bash
cd backend
```

Defina a variável de ambiente com sua chave do Gemini:

```bash
# Linux / macOS
export GEMINI_API_KEY=sua_chave_aqui

# Windows (PowerShell)
$env:GEMINI_API_KEY="sua_chave_aqui"
```

Inicie o servidor:

```bash
./mvnw spring-boot:run
```

O backend estará disponível em `http://localhost:8080`.

### 3. Configure o Frontend

```bash
cd frontend
npm install
npm start
```

A aplicação estará disponível em `http://localhost:4200`.

> O proxy de desenvolvimento encaminha automaticamente as chamadas de `/food` e `/recipe` para o backend em `localhost:8080`.

---

## 📡 Endpoints da API

### Alimentos (`/food`)

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/food/all` | Lista todos os alimentos |
| `GET` | `/food/{id}` | Busca um alimento por ID |
| `POST` | `/food/add` | Cadastra um novo alimento |
| `PATCH` | `/food/update/{id}` | Atualiza parcialmente um alimento |
| `DELETE` | `/food/delete/{id}` | Remove um alimento |

### Receitas (`/recipe`)

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/recipe/generate?lang=pt` | Gera receita com os itens da geladeira |

**Parâmetro `lang`:** `pt` para Português, `en` para Inglês.

---

## 📂 Estrutura do Projeto

```
SmartFridge/
├── backend/
│   └── src/main/java/dev/java10x/SmartFridge/
│       ├── config/          # CORS e WebClient
│       ├── controller/      # FoodItemController, RecipeController
│       ├── exception/       # ResourceNotFoundException
│       ├── model/           # FoodItem entity, DTOs
│       ├── repository/      # FoodItemRepository (JPA)
│       └── service/         # FoodItemService, GeminiService
│
└── frontend/
    └── src/app/
        ├── core/
        │   ├── models/      # FoodItem interface + categorias
        │   └── services/    # food-item, recipe, theme services
        ├── features/
        │   ├── dashboard/   # Inventário principal
        │   ├── food-item-card/   # Card individual do alimento
        │   ├── food-item-form/   # Modal de criação/edição
        │   └── recipe/      # Gerador de receitas com IA
        └── assets/i18n/     # en.json, pt.json
```

---

## 🗂️ Categorias de Alimentos

O sistema suporta 11 categorias, cada uma com ícone e cor distintos:

| Categoria | Ícone | Cor |
|-----------|-------|-----|
| Dairy | 🥛 | Azul |
| Meat | 🥩 | Vermelho |
| Seafood | 🐟 | Ciano |
| Vegetables | 🥦 | Verde |
| Fruits | 🍎 | Rosa |
| Grains | 🌾 | Âmbar |
| Beverages | 🥤 | Roxo |
| Condiments | 🧂 | Laranja |
| Snacks | 🍿 | Amarelo |
| Frozen Foods | ❄️ | Azul claro |
| Other | 📦 | Cinza |

---

## 🌍 Internacionalização

A aplicação está disponível em dois idiomas com troca dinâmica na navbar:

- 🇧🇷 **Português (Brasil)**
- 🇺🇸 **English**

Os arquivos de tradução estão em `frontend/src/assets/i18n/`. O idioma selecionado também é enviado ao backend para que as receitas geradas pelo Gemini respondam no idioma correto.

---

## ☁️ Deploy

O projeto está configurado para deploy na plataforma [Railway](https://railway.app/):

- **Backend:** `https://smartfridge-production-a852.up.railway.app`
- **Variável obrigatória:** `GEMINI_API_KEY`

---

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

<div align="center">
  Feito com ❤️ por <a href="https://github.com/diegocorte1771">Diego Corte</a>
</div>
