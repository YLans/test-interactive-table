<template>
  <table class="section__table table">
    <tr class="table__row">
      <th class="table__head">Id</th>
      <th class="table__head">Name</th>
      <th class="table__head">Username</th>
      <th class="table__head">Birth Date</th>
      <th class="table__head">Image</th>
    </tr>
    <tr v-for="item in tickets" :key="item.id" class="table__row">
        <td class="table__cell">{{ item.id }}</td>
        <td class="table__cell">{{ item.firstName + ' ' + item.lastName}}</td>
        <td class="table__cell">{{ item.username }}</td>
        <td class="table__cell">{{ item.birthDate }}</td>
        <td class="table__cell">
          <TicketImage
            :imageSrc="item.image"
            :itemId="item.id"
            @submitAvatar="onSubmitAvatar"
            />
        </td>
    </tr>
  </table>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import TicketImage from '@/components/TicketImage.vue';

export default {
  name: 'TicketsTable',
  components: {
    TicketImage,
  },
  setup() {
    const store = useStore();

    const changeTicketDate = (itemCreatedAt) => {
      const itemDate = new Date(itemCreatedAt);
      const itemMonthNum = itemDate.getMonth();

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[itemMonthNum]} ${itemDate.getDay()}, ${itemDate.getFullYear()}`;
    };

    const tickets = computed(() => ((store.state.tickets
      ? store.state.tickets.map((item) => ({
        ...item,
        birthDate: changeTicketDate(item.birthDate),
      }))
      : [])));

    const onSubmitAvatar = (file, itemId) => {
      const item = tickets.value.find((el) => el.id === itemId);
      if (item && file) {
        // setup form data
        const formData = new FormData();
        formData.append('image', file);
        // call action
        store.dispatch('setNewAvatar', { formData, itemId });
      }
    };

    return {
      tickets,
      changeTicketDate,
      onSubmitAvatar,
    };
  },
};
</script>

<style lang="scss">
.main .table {
    width: 100%;
    margin-bottom: 100px;
    border-collapse: collapse;
    &__row {
      border-bottom: 1px solid #DFE0EB;
    }
    &__head, &__cell {
      text-align: left;
      &:first-child {
        padding-left: 77px;
      }
      &:last-child {
        position: relative;
        padding-right: 10px;
      }
    }
    &__head {
      padding-bottom: 12px;
      font-weight: 700;
      font-size: 14px;
      line-height: 18px;
      letter-spacing: 0.2px;
      color: #9FA2B4;
    }
    &__cell {
      padding-top: 10px;
      padding-bottom: 16px;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.2px;
      text-align: left;
      color: #252733;
      p {
        max-width: 300px;
      }
    }
}
</style>
