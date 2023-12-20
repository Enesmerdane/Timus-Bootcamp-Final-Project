# Timus-Bootcamp-Final-Project
<h2>To run project</h2>
<ol>
    <li>Download code</li>
    <li>Run npm install for the root, server, and client directories</li>
    <li>Create .env file with given variables below:</li>
</ol>
<br>

```

{
    PORT

    ELASTIC_SEARCH_NODE=elastic cloud url
    ELASTIC_SEARCH_USERNAME=elastic cloud username
    ELASTIC_SEARCH_PASSWORD=elastic cloud password
    
    POSTGRE_DB_USER=elephantql postgre username
    POSTGRE_DB_HOST=elephantql postgre host url
    POSTGRE_DB_NAME=elephantql db name 
    POSTGRE_DB_PASSWORD=elephantql db password
    POSTGRE_DB_PORT=elephantql db port
    
    POSTGRE_DB_LINK=elephantql complete link
    POSTGRE_API_KEY
    
    
    DB_SECRET=db secret for hashing passwords
    DB_SECRET_REFRESH=db secret for creating access and refresh token
    }

```

<br>
<h1>Introduction</h1>

This project is created as a final project of Patika&Timus Fullstack Bootcamp.

<strong>Project description:</strong> The aim of the project is to create a fullstack project which provides users with a platform in which they can register and add, delete and manage the factory information they added.

<strong>Backend technologies used:</strong><br>
[1. Nest.js](https://nestjs.com/)<br>
[2. PostgreSQL](https://www.postgresql.org/)<br>
[3. ElephantSQL](https://www.elephantsql.com/)

<strong>Frontend technologies used:</strong><br>
[1. Vue.js](https://vuejs.org/)

<h1>Project Analysis</h1>

<h2>Functional Requirements</h2>
<ol>
    <li>Register as an admin or editor to the system.</li>
    <li>Login/logout to the system</li>
    <li>Login with remember me feature.</li>
    <li>Display factory list with summary information.</li>
    <li>Display factory list with detail information.</li>
    <li>Add and/or remove column to factory tables.</li>
    <li>Language of the webpage can be choosen.</li>
    <li>All requests will be logged in the PostgreSQL DB</li>
</ol>

<h2>Nonfunctional Requirements</h2>
<ol>
    <li>Requests and responses will be logged in the PostgreSQL DB</li>
    <li>For Factory information operations, PostgreSQL will be used.</li>
    <li>For authentication operations, Elasticsearch will be used</li>
    <li>For session management, refresh and access tokens will be used.</li>
    <li>For state management in Vue, Pinia will be used.</li>
</ol>

<h2>Mockup Designs</h2>

<h3>Register Page</h3>
<img src="https://github.com/Enesmerdane/Timus-Bootcamp-Final-Project/blob/main/Mockup%20Designs/RegisterScreen.png?raw=true"/>
<img src="https://github.com/Enesmerdane/Timus-Bootcamp-Final-Project/blob/main/Mockup%20Designs/RegisterScreen2.png?raw=true"/>
<img src="https://github.com/Enesmerdane/Timus-Bootcamp-Final-Project/blob/main/Mockup%20Designs/RegisterScreen3.png?raw=true"/>
<h3>Login Page</h3>
<img src="https://github.com/Enesmerdane/Timus-Bootcamp-Final-Project/blob/main/Mockup%20Designs/LoginScreen.png?raw=true"/>
<img src="https://github.com/Enesmerdane/Timus-Bootcamp-Final-Project/blob/main/Mockup%20Designs/LoginScreen2.png?raw=true"/>
<h3>Factory List Page</h3>
<img src="https://github.com/Enesmerdane/Timus-Bootcamp-Final-Project/blob/main/Mockup%20Designs/HomeScreen%20-%20Dashboard%20-%20Fabrika%20Duzenle.png?raw=true"/>
<img src="https://github.com/Enesmerdane/Timus-Bootcamp-Final-Project/blob/main/Mockup%20Designs/HomeScreen%20-%20Dashboard%20-%20Fabrika%20Listesi.png?raw=true"/>
<img src="https://github.com/Enesmerdane/Timus-Bootcamp-Final-Project/blob/main/Mockup%20Designs/HomeScreen%20-%20Dashboard%20-%20Sutun%20ekle.png?raw=true"/>
<img src="https://github.com/Enesmerdane/Timus-Bootcamp-Final-Project/blob/main/Mockup%20Designs/HomeScreen%20-%20Dashboard%20-Delete%20row.png?raw=true"/>
<h3>Factory Details Page</h3>
<img src="https://github.com/Enesmerdane/Timus-Bootcamp-Final-Project/blob/main/Mockup%20Designs/HomeScreen%20-%20Dashboard%20-%20Fabrika%20Detay.png?raw=true"/>

<h2>System Design</h2>

<h3>Database Design</h3>

<h4>users_auth</h4>
<img src="https://github.com/Enesmerdane/Timus-Bootcamp-Final-Project/blob/main/Diagrams/DB_user_auth.png?raw=true"/>
<h4>factory tables</h4>
<img src="https://github.com/Enesmerdane/Timus-Bootcamp-Final-Project/blob/main/Diagrams/DB_factory_design.png?raw=true"/>
<h4>logtable</h4>
<img src="https://github.com/Enesmerdane/Timus-Bootcamp-Final-Project/blob/main/Diagrams/DB_logtable_design.png?raw=true"/>
<h3>API List</h3>
<h4>1. Register POST /api/auth/register</h4>
This api is designed for new user creation. User information and type are included inside request body
<br>
<br>

<strong>Request body:</strong>
<br>
```
{
    username: string,
    email: string,
    password: string,
    role: number
}
```

<strong>Response body:</strong>

```
{
    result: boolean,
    statusCode: number,
    payload: {},
    errorCode: number,
    message: string
}
```

<h4>2. Login POST /api/auth/login</h4>
This api is designed for login use case. Email and password are included in the request body.
<br>
<br>

<strong>Request body:</strong>
<br>
```
{
    email: string,
    password: string,
}
```

<strong>Response body:</strong>

```
{
    result: boolean,
    statusCode: number,
    payload: {
        access_token: string,
        refresh_token: string 
    },
    errorCode: number,
    message: string
}
```

<h4>3. Get Factory List GET /api/factory</h4>
This api is designed to retrieve all factories with their summary information.


<br>If there are other columns that user added, they will be returned in the response as well.


<strong>Request body:</strong>
<br>
```
{
    order_options: {
        column_number: number,
        desc: boolean
    };
}
```

<strong>Query parameters:</strong>
<br>
```
{
    page: number
}
```

<strong>Request header:</strong>
<br>
```
{
    "Authorization" : "Bearer TOKEN" 
}
```

<strong>Response body:</strong>

```
{
    result: Boolean,
    statusCode: number,
    payload: {
        factoryList: [
            {
                factory_id: String,
                factory_name: String,
                subscription_start_date: Date,
                subscription_end_date: Date,
                number_of_workers: Number,
                free_user: boolean
            }
        ]
    },
    errorCode: number,
    message: string
}
```

<h4>4. Get Factory Details GET /api/factory_details/:factory_id</h4>
This api is designed to retrieve factory details.

<br>Any columns added later by the users, will be included in the response body as well.

<strong>Request body:</strong>
<br>
```
{
    order_options: {
        column_number: number,
        desc: boolean
    };
}
```

<strong>Query parameters:</strong>
<br>
```
{
    page: number
}
```

<strong>Request header:</strong>
<br>
```
{
    "Authorization" : "Bearer TOKEN" 
}
```

<strong>Response body:</strong>

```
{
    result: Boolean,
    statusCode: number,
    payload: {
        factoryDetailsList: [
            {
                factory_id: String,
                date_range: String,
                unit: String,
                usage: Double,
                usage_fee: Double,
                discounted_fee: Boolean,
            }
        ]
    },
    errorCode: number,
    message: string
}
```

<h4>5. Change Factory Details PUT /api/factory_details/:factory_id</h4>
This api is designed to change factory details.

<br>Any columns added later by the users, will be included in the request body as well.

<strong>Request body:</strong>
<br>
```
{
    data: 
        {
            factory_id: String,
            date_range: String,
            unit: String,
            usage: Double,
            usage_fee: Double,
            discounted_fee: Boolean,
        }
}
```

<strong>Request header:</strong>
<br>
```
{
    "Authorization" : "Bearer TOKEN" 
}
```

<strong>Response body:</strong>

```
{
    result: Boolean,
    statusCode: number,
    payload: { },
    errorCode: number,
    message: string
}
```

<h4>6. Change Factory Summary Information PUT /api/factory/:factory_id</h4>
This api is designed to change factory details.

<br>Any columns added later by the users, will be included in the request body as well.

<strong>Request body:</strong>

```
{
   data: 
        {
            factory_id: String,
            date_range: String,
            unit: String,
            usage: Double,
            usage_fee: Double,
            discounted_fee: Boolean,
        }
        
}
```

<strong>Request header:</strong>
<br>
```
{
    "Authorization" : "Bearer TOKEN" 
}
```

<strong>Response body:</strong>

```
{
    result: Boolean,
    statusCode: number,
    payload: { },
    errorCode: number,
    message: string
}
```

<h4>7. Add Column to the Factory List Table PUT /api/factorytable</h4>
This api is designed to add column to the factory list table.

<strong>Request body:</strong>
<br>
```
{
    column_options: {
        column_name: string,
        column_type: "text" || "integer" || "decimal" || "boolean" || "date"
    }       
}
```

<strong>Request header:</strong>
<br>
```
{
    "Authorization" : "Bearer TOKEN" 
}
```

<strong>Response body:</strong>

```
{
    result: Boolean,
    statusCode: number,
    payload: { },
    errorCode: number,
    message: string
}
```

<h4>8. Add Column to the Factory Details Table PUT /api/factory_details/</h4>
This api is designed to add column to the factory details table.

<strong>Request body:</strong>

```
{
    payload: {
        column_name: String,
        column_type: "text" || "integer" || "decimal" || "boolean" || "date"
    }
        
}
```

<strong>Request header:</strong>
<br>
```
{
    "Authorization" : "Bearer TOKEN" 
}
```

<strong>Response body:</strong>

```
{
    result: Boolean,
    statusCode: number,
    payload: { },
    errorCode: number,
    message: string
}
```

<h4>9. Delete Column from the Factory List Table PUT /api/factory/</h4>
This api is designed to add column to the factory list table.

<strong>Request body:</strong>

```
{
    column_name: String
}
```

<strong>Request header:</strong>

```
{
    "Authorization" : "Bearer TOKEN" 
}
```

<strong>Response body:</strong>

```
{
    result: Boolean,
    statusCode: number,
    payload: { },
    errorCode: number,
    message: string
}
```

<h4>10. Delete Column from the Factory Details Table PUT /api/factory/</h4>
This api is designed to add column to the factory details table.

<strong>Request body:</strong>
<br>
```
{
    payload: {
        column_name: String
    }
}
```

<strong>Request header:</strong>
<br>
```
{
    "Authorization" : "Bearer TOKEN" 
}
```

<strong>Response body:</strong>

```
{
    result: Boolean,
    statusCode: number,
    payload: { },
    errorCode: number,
    message: string
}
```

<h4>11. Refresh Token POST /api/token-refresh</h4>
This api is designed to refresh access token of the user details table.

<strong>Request body:</strong>
'token' in the body represents refresh token

```
{
    refreshToken: String   
}
```

<strong>Response body:</strong>

```
{
    result: Boolean,
    statusCode: number,
    payload: { 
        token: string
    },
    errorCode: number,
    message: string
}
```
