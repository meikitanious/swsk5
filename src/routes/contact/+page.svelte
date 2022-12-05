<script>
  $: revealNumber = false;
  $: revealEmail = false;
  let name = "";
  let businessEmail = "";
  let message = "";
  let sent = false;

  const sendMessage = (nameF, businessEmailF, messageF) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "data": {
        "Name": nameF,
        "BusinessEmail": businessEmailF,
        "Message": messageF
      }
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://jellyfish-app-9zisi.ondigitalocean.app/api/contact-requests", requestOptions)
      .then(response => response.text())
      .then(result => {
        sent = true;
        setTimeout(() => {
          sent = false;
          name = "";
          businessEmail = "";
          message = "";
        }, 1500);
      })
      .catch(error => console.log('error', error));
    }
</script>

<div class="pop-up-thanks" style="transform: {sent ? "scale(1) translateX(-50%)" : "scale(0)"}">
  <span>Thank You!<br>We will soon contact you</span>
</div>
<div class="contact">
  <div class="container">
    <h1>Contact</h1>
    <div class="contact-form">
      <input type="text" placeholder="Name" bind:value={name}>
      <input type="email" placeholder="Business Email" id="email" bind:value={businessEmail}>
      <textarea id="message" placeholder="Message" cols="30" rows="3" bind:value={message}></textarea>
      <button on:click={() => sendMessage(name, businessEmail, message)}>Send</button>
    </div>
    <div class="contact-now">
      <div class="reveal"
        on:click={() => revealNumber = true}
        style='background-color: {revealNumber ? 'white' : '#e5e5e5'}'
      >
        <span>{revealNumber ? "+1 123 123 123" : "Reveal Number"}</span>
      </div>
      <div class="reveal" 
        on:click={() => revealEmail = true}
        style='background-color: {revealNumber ? 'white' : '#e5e5e5'}'
        >
          <span>{revealEmail ? "email@scalewhale.com" : "Reveal Email"}</span>
      </div>
    </div>
  </div>
</div>

<style lang=scss>
  .pop-up-thanks {
    position: absolute;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 0 15px rgba(0, 0, 0, .25);
    font-size: 1.5rem;
    font-weight: 600;
    background-color: white;
    top: 30%;
    left: 50%;
    transform-origin: center !important;
    transform: translateX(-50%);
    text-align: center;
  }

  .contact {
    h1 {
      font-size: 250%;
      color: white;
      font-weight: 600;
      text-align: center;
      margin: 5px;
    }

    .contact-form {
      @include flex(column, center, center);
      row-gap: 10px;
      max-width: 400px;
      margin: auto;

      input,
      textarea,
      button {
        width: 100%;
        padding: 10px 20px;
        outline: 0;
        border-radius: 5px;
        resize: none;
        background-color: white;
        border: 2px solid #e5e5e5;
      }

      input,
      textarea {
        &:focus {
          caret-color: $bColor2;
        }
      }

      button {
        font-weight: 600;
      }
    }

    .contact-now {
      @include flex(column, center, center);
      max-width: 400px;
      row-gap: 10px;
      margin: 10px auto;
      
      .reveal {
        cursor: pointer;
        font-size: 100%;
        background-color: white;
        width: 100%;
        padding: 10px 20px;
        border-radius: 5px;
        text-align: center;
        background-color: #e5e5e5;
        border: 2px solid #e5e5e5;
      }
    }
  }
</style>