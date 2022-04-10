<template>
  <div id="app">
    <header id="header">
      <h1>Photo Bomb</h1>
      <nav>
        <router-link to="/"><i class="fas fa-home"></i></router-link>
        <router-link to="/dashboard"><i class="fas fa-user"></i></router-link>
      </nav>
    </header>
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      <a href="https://github.com/BYUCS260/photo-bomb-jcubby86">
        <h5>View GitHub Repository here</h5>
      </a>
    </div>
  </div>
</template>

<style>
/* Color scheme: https://paletton.com/#uid=7040u0knHs+edG7jrvYscpiuCk2 */
/* red: #e74c3c
 * blue: #277E8E
 */
body {
  font-family: 'Work Sans', sans-serif;
  font-weight: 300;
  font-size: 13pt;
  margin: 0px 200px;
}

#header {
  /* Semi-circle */
  margin: 0 1em 1em 0;
  height: 100px;
  width: 200px;
  border-bottom-left-radius: 200px;
  border-bottom-right-radius: 200px;
  /* Fixed position */
  position: fixed;
  z-index: 10000;
  left: 50%;
  transform: translate(-50%, 0);
  /* Color and alignment */
  background: #e74c3c;
  text-align: center;
  box-shadow: 0 0 0 1em #FFF;
}

nav {
  display: flex;
  justify-content: center;
}

h1 {
  color: #fff;
  font-size: 18px;
}

h2 {
  font-size: 12px;
}

#header .fas {
  font-size: 25px;
  color: #fff;
  width: 50px;
}

.pure-button-primary {
  background-color: #277E8E;
}

.footer{
    position:fixed;
    bottom: 0;
    width: 100%;
    height: 30px;
    background-color: #e74c3c;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: solid #277E8E 5px;
    margin-left: -200px;
}
.footer a{
    color: #fff;
    text-decoration: none;
    margin-top: 10px;
}
.footer a:hover{
    text-decoration: underline;
}

.content {
  margin-bottom: 50px;
}
</style>
