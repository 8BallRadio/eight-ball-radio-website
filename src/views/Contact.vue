<template>
  <main id="maincontent">
    <section id="contact">
      <h2>
        <span class="title__left">
          <img src="../assets/content/wave-gray-left.svg" alt>
        </span>
        CONTACT
        <span class="title__right">
          <img src="../assets/content/wave-gray-right.svg" alt>
        </span>
      </h2>
      <form name="contact" method="POST" data-netlify="true" class="contact-form">
        <p>
          <label class="sr-only" for="name">Your Name:</label>
          <input type="text" name="name" id="name" placeholder="YOUR NAME">
        </p>
        <p>
          <label class="sr-only" for="email">Your Email:</label>
          <input type="email" name="email" id="email" placeholder="YOUR EMAIL">
        </p>
        <p>
          <label class="sr-only" for="subject">Subject:</label>
          <input type="text" name="subject" id="subject" placeholder="SUBJECT">
        </p>
        <p>If you have question about our site, shows inquiries or have found a bug on our website, please contact us with your details. We will review your message as soon as we can.</p>
        <p>
          <label class="sr-only" for="message">Message:</label>
          <textarea name="message" id="message" rows="12"></textarea>
        </p>
        <button type="submit" class="contact__btn">SEND</button>
      </form>
    </section>
  </main>
</template>

<script>
export default {
  name: "Contact"
};
</script>
