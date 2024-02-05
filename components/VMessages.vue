<script>
export default {
  props: {
    name: String,
    message: String,
  },
};
</script>
<!-- (
  :title="data.name"
  :subtitle="data.text"
  prepend-avatar="") {{ data.user.name }} -->

<template lang="pug">
v-list-item
  v-list-item-avatar
    v-img(src="https://randomuser.me/api/portraits/women/8.jpg")
  v-list-item-content
    v-list-item-title(v-html="name")
    v-list-item-subtitle(v-html="message")
</template>

<style scoped>
.message {
  width: max-content;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  width: 100%;
}

.text {
  padding: 10px;
  border-radius: 12px;
  font-size: 15px;
  color: #fff;
}

.user {
  font-size: 14px;
  color: rgb(176, 176, 176);
}

.user {
  align-items: flex-start;
}

.user .text {
  background: #514c4c;
}

.user .user {
  padding-left: 10px;
}

.me {
  align-items: flex-end;
}

.me .text {
  background: #0d49d7;
}

.me .user {
  padding-right: 10px;
}
</style>
