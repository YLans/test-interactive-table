<template>
  <div
    class="table__cell-avatar"
    :style="{backgroundImage: avatarSrc !== null ? `url('${avatarSrc}')` : '' }">
    <label
      v-if="!showSaveAvatarBtn"
      :for="'file' + itemId"
      class="table__cell-avatar__btn"
    >Change
      <input
        type="file"
        ref="file"
        :name="'file' + itemId"
        :id="'file' + itemId"
        accept="image/*"
        @change="handleAvatarUpload"
      />
  </label>
  <button v-else class="btn table__cell-avatar__btn btn-save" @click="submitAvatar">Save</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'TicketImage',

  props: {
    imageSrc: String,
    itemId: Number,
  },

  setup(props, context) {
    const avatarSrc = ref(props.imageSrc);
    const showSaveAvatarBtn = ref(false);
    const newImgFile = ref('');

    const handleAvatarUpload = function (evt) {
      [newImgFile.value] = evt.target.files;
      if (newImgFile.value) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          // replace avatar src
          this.avatarSrc = reader.result;
          this.showSaveAvatarBtn = true;
        }, false);
        // start reading uploaded file (launches load event)
        if (/\.(jpe?g|png|gif)$/i.test(newImgFile.value.name)) {
          reader.readAsDataURL(newImgFile.value);
        }
      }
    };

    const submitAvatar = (evt) => {
      evt.preventDefault();
      // emit the event
      context.emit('submitAvatar', newImgFile.value, props.itemId);
      // reset avatr button
      showSaveAvatarBtn.value = false;
    };

    return {
      showSaveAvatarBtn,
      newImgFile,
      avatarSrc,
      handleAvatarUpload,
      submitAvatar,
    };
  },
};
</script>

<style lang="scss">
.main .table__cell-avatar {
  position: relative;
  width: 98px;
  height: 93px;
  border-radius: 50%;
  background-color: #C4C4C4;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  cursor: pointer;
  &__btn {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 20px;
    font-weight: 700;
    font-size: 9px;
    text-align: center;
    letter-spacing: 0.4px;
    color: #FFFFFF;
    background: rgba(0, 0, 0, 0.55);
    transition: .3s;
    cursor: pointer;
    &:not(.btn-save) {
      visibility: hidden;
      opacity: 0;
    }
    input[type="file"] {
      display: none;
    }
  }
  &:hover, &:active, &:focus {
    .table__cell-avatar__btn:not(.btn-save) {
      visibility: visible;
      opacity: 1;
    }
  }
}
</style>
