<template>
  <div class="vcenter">
    <div class="container welcome">
      <div class="welcome-header hero is-primary">
        <div class="hero-body">
          <div class="container">
            <h3 class="title is-3">
              welcome to clustering virtualization
            </h3>
          </div>
        </div>
      </div>
      <div class="welcome-body level">
        <div class="level-item">
          <aside class="operations menu">
            <p class="menu-label">
              Choose operation
            </p>
            <ul class="menu-list">
              <li> <span class="block"><a href="#">open file</a></span></li>
              <li> <span class="block"><a href="#">input data</a></span></li>
            </ul>
          </aside>
        </div>
        <img src="@/assets/welcome-pic.png" class="welcome-pic image" />
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'Welcome'
    }
</script>

<style scoped src="../../../assets/css/bulma.min.css">
    html{
        background-color: #f7f7f7;
    }
    .welcome {
        width: 560px;
        height: 315px;
        background-color: #fff;

    }
    .vcenter {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
    }
    .welcome-header {
        height: 40%;
        background-color: #607D8B;
    }
    .welcome-body {
        height: 60%;
    }
    .welcome-pic {
        height: 100%;
    }

</style>
