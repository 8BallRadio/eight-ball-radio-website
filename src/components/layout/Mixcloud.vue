<template>
  <div>
    <iframe
      id="mixcloud"
      :src="link"
      @load="mountApi"
      width="100%"
      height="120"
      frameborder="0"
      allow="autoplay"
    >
    </iframe>
  </div>
</template>

<script>
let widget = null;

export default {
  name: "Mixcloud",
  computed: {
    link: function() {
      // ...
      // Test link
      return "http://mixcloud.com/8ballradio/coconuts-carnival-9/";
    }
  },
  methods: {
    mountApi: function() {
      // eslint-disable-next-line
      widget = Mixcloud.PlayerWidget(document.getElementById('mixcloud'))
    },
    play: function() {
      widget.play();
    },
    pause: function() {
      widget.pause();
    }
  }
};
</script>
