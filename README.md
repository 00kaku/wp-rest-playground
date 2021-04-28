# A React Js application that uses Wordpress Rest API as backend

It is a react application that uses a local wordpress website as the headless cms. Registered users can login into the website and can then post comments. All users
irrespective of login can search the posts based on some term from the home page. Users can also see posts segregated by categories using the navbar which is also fetched from the wordpress cms. Also each user can read the  approved comments on the posts. It also has 2 plugins that hook into the rest api and create custom end points for us to fetch data.

###### ReactJs is used for the structure of the website
###### Wordpress Rest Api is used as backend data provider.

#### Screenshots
**Landing Page**
![Screenshot from 2021-04-23 17-49-59](https://user-images.githubusercontent.com/22026768/115870242-97766f80-a45c-11eb-82d9-bc9dd1a91274.png)

**Posts' List Page**
![Screenshot from 2021-04-23 17-50-20](https://user-images.githubusercontent.com/22026768/115870283-a78e4f00-a45c-11eb-831d-919a5789e1d9.png)

**Post Page**
![Screenshot from 2021-04-23 17-50-35](https://user-images.githubusercontent.com/22026768/115870320-b7a62e80-a45c-11eb-82c7-cc25dcb00eb2.png)

**Comments Page**
![Screenshot from 2021-04-23 17-50-45](https://user-images.githubusercontent.com/22026768/115870387-d1477600-a45c-11eb-923e-1bc359da0f22.png)
![Screenshot from 2021-04-23 17-51-09](https://user-images.githubusercontent.com/22026768/115870391-d278a300-a45c-11eb-89a0-765f73fa571f.png)

**Wordpress admin page for url format**
![Screenshot from 2021-04-23 17-49-35](https://user-images.githubusercontent.com/22026768/115870425-ddcbce80-a45c-11eb-8684-31e668693507.png)

**Error 404 Page**
![Screenshot from 2021-04-23 17-51-29](https://user-images.githubusercontent.com/22026768/115870459-e7553680-a45c-11eb-85b0-33956123dfab.png)


#### How to use it
1. Download the github repo.
2. Create a local wordpress installation using any tool of your choice. In the project LocalWp by flywheel is used. (**https://localwp.com/**).
3. Copy the content of **Wordpress Code/Plugins/** into the plugins directory of your local install to create the functionality of custom end points in the api.
4. Go to the wordpress admin panel and activated the 2 new plugins.
5. Change the **REACT_APP_WP_SITE_URL** variable's value with your local wordpress installation's url.
6. Create some posts in your wordpress installation with some separate categories.
7. Create a menu in wordpress admin panel with the name **menu**.
8. Add custom links in the menu with the url in format **/posts/:your_category_here:**. For example for a category DC the url will look like /posts/dc.
9. Install the **JWT Authentication for WP-API** plugin from admin dashboard. This will be used for authentication using JWT.
10. Open the **.htaccess** file in your **public** directory of local wordpress installation and add the following code to it:
```
RewriteEngine on
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
```
11. Open the **.wp-config** file in your **public** directory of local wordpress installation and add the following code to it:
```
define('JWT_AUTH_SECRET_KEY', 'your-top-secret-key_here');
```
10. In the root folder of you application run **npm -i** to install the dependencies.
11. Run the local wordpress installation.
12. Run the application using **npm start**.
