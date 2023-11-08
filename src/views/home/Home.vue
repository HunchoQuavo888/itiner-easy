<template>
  <div>
    <!-- <div><NavbarLanding/></div> -->
    <Eye></Eye>
    <LandingContent></LandingContent>
  </div>
  </template>
  
  <script>
  import Eye from './eye3.vue';
  // import NavbarLanding from '../../components/NavbarLanding.vue';
  import LandingContent from './landingContent.vue';
  
  export default {
    components: {
      Eye,
      // NavbarLanding,
      LandingContent
    },
  };
  </script>
  