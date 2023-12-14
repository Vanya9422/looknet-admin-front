<template lang="pug">
  main.main
    section-users(title="Moderators" moderator)

</template>

<script>
export default {
  middleware:['showModerators']
}
</script>
