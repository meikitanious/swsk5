<div class="error">
  <div class="container">
    <h1>404</h1>
    <p>The path you're trying to access does not exist</p>
    <a href="/">Go to Mainpage</a>
  </div>
</div>

<style lang=scss>
  .error {
    color: white;

    .container {
      @include flex(column, center, center);
      row-gap: 10px;
    }
  }

  h1 {
    font-size: 500%;
    font-weight: 800;
  }

  p {
    font-size: 160%;
    text-align: center;
  }

  a {
    font-size: 120%;
    padding: 10px;
    background-color: white;
    color: black;
    font-weight: 600;
    border-radius: 5px;
  }
</style>