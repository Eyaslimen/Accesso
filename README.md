
## Accesso

Plateforme e-commerce simple permettant d'explorer des catégories et produits, gérer un panier et des comptes utilisateurs. Le projet comprend un backend ASP.NET Core (.NET 8, API REST, EF Core) et un frontend Angular 18.

### Description du projet

Accesso propose:
- Navigation par catégories et consultation des produits (nom, description, prix, image).
- Création de compte et connexion utilisateur basique (hash/salt HMACSHA512).
- Gestion de panier par utilisateur: ajout, consultation et suppression d'articles.
- Service de fichiers statiques (images) depuis `wwwroot/images` côté API.
- Swagger activé en développement et CORS permissif pour le front local.

### Rôles utilisateurs
- Client: parcourt catégories et produits, ajoute au panier, crée un compte et se connecte.
- Administrateur/éditeur (via API): peut créer/modifier/supprimer catégories et produits.

## Fonctionnalités principales

- Produits
  - `GET /api/Products` — liste des produits
  - `GET /api/Products/{id}` — détail produit
  - `POST /api/Products` — création
  - `PUT /api/Products/{id}` — mise à jour
  - `DELETE /api/Products/{id}` — suppression

- Catégories
  - `GET /api/Categories` — catégories avec leurs produits (DTO)
  - `GET /api/Categories/{id}` — détail catégorie + produits (DTO)
  - `GET /api/Categories/{categoryId}/products?minPrice&maxPrice&query` — filtrage/recherche
  - `POST /api/Categories` — création
  - `DELETE /api/Categories/{id}` — suppression

- Utilisateurs
  - `POST /api/Users/register` — inscription, création automatique d’un panier
  - `POST /api/Users/login` — authentification basique

- Panier (par utilisateur)
  - `GET /api/Carts/cart/{userId}` — récupérer les articles (DTO)
  - `POST /api/Carts/cart/{userId}/add` — ajouter un article
  - `DELETE /api/Carts/cart/{userId}/remove/{cartItemId}` — supprimer un article

## Prérequis

- .NET SDK 8.x
- Node.js 18+ et npm
- Angular CLI 18+ (`npm i -g @angular/cli`)
- SQL Server LocalDB (ou un SQL Server compatible avec EF Core)

## Démarrage rapide

### 1) Backend (.NET 8)

1. Vérifier/adapter la chaîne de connexion dans `Accesso_backend/appsettings.json` (clé `ConnectionStrings:accessodata`):

```json
{
  "ConnectionStrings": {
    "accessodata": "Data Source=(LocalDB)\\MSSQLLocalDB;Initial Catalog=Access_database;Integrated Security=True;Pooling=False;Encrypt=True;Trust Server Certificate=False"
  }
}
```

2. Se placer dans le dossier backend, restaurer, appliquer les migrations et lancer l’API:

```bash
cd Accesso_backend
dotnet restore
dotnet ef database update
dotnet run
```


### 2) Frontend (Angular 18)

Installer les dépendances et démarrer le serveur de dev:

```bash
cd accesso_front
npm install
npm start
# ou
ng serve
```

### 3) Intégration Front ↔ API

- Adapter l’URL de base de l’API dans les services Angular (ex: `https://localhost:7185` ou `http://localhost:5278`).
- Vérifier les appels dans `src/app/services/` et composants qui consomment l’API (ex: produits, catégories, panier, auth).

## Démo

[Voir la vidéo](https://drive.google.com/drive/u/0/folders/1kGxcd34e7VgHUMngi7BBcIJwwlOXr4kM)




