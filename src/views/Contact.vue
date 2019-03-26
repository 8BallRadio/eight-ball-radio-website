<template>
  <main id="maincontent">
    <section id="contact">
      <h2>
        <span class="title__icon">
          <img src="../assets/content/ball-icon.svg" alt>
        </span>
        CONTACT
        <span class="title__icon">
          <img src="../assets/content/ball-icon.svg" alt>
        </span>
      </h2>
      <div align="left">
        <p>If you have question about our website or have found a bug on our website, please send us an e-mail at <strong>eightballradio@gmail.com</strong></p>
        <p> We will review your message as soon as we can.</p>
        <p>If you are interested in having a show at 8-Ball Radio, click <router-link to="/showsubmission">here</router-link>.</p>
        <!-- <p>Your proposal should contain the following:
          <ul>
            <li>Your name.</li>
            <li>Some information about yourself.</li>
            <li>A description of your show.</li>
            <li>A playlist of songs (if you're playing music).</li> 
            <li>A snippet of what your show would sound like (if you're not playing music).</li>
          </ul>
        </p>
        <p>Shows proposals are reviewed and accepted quarterly. You'll hear from us regarding your show at the start of a new quarter. Thanks.</p> -->
      </div>
      <!-- <form name="contact" method="POST" data-netlify="true" class="contact-form">
        <p class="contact__name">
          <label class="sr-only" for="name">Your Name:</label>
          <input type="text" name="name" id="name" placeholder="YOUR NAME">
        </p>
        <p class="contact__email">
          <label class="sr-only" for="email">Your Email:</label>
          <input type="email" name="email" id="email" placeholder="YOUR EMAIL">
        </p>
        <p class="contact__subject">
          <label class="sr-only" for="subject">Subject:</label>
          <input type="text" name="subject" id="subject" placeholder="SUBJECT">
        </p>
        <p>If you have question about our site, shows inquiries or have found a bug on our website, please contact us with your details. We will review your message as soon as we can.</p>
        <p class="contact__message">
          <label class="sr-only" for="message">Message:</label>
          <textarea
            name="message"
            id="message"
            rows="12"
            maxlength="500"
            placeholder="TYPE YOUR MESSAGE. PLEASE LIMIT  TO 500 CHARACTERS OR LESS"
          ></textarea>
        </p>
        <button type="submit" class="contact__btn">SEND</button>
      </form> -->
    </section>
  </main>
</template>

<script>
export default {
  name: "Contact",
  mounted() {
    window.scroll(0, 0);
  }
};
</script>
