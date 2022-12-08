<template>
  <TicketsTable />
</template>

<script>
import { useStore } from 'vuex';
import { onMounted } from 'vue';

import TicketsTable from '@/components/TicketsTable.vue';

export default {
  name: 'App',
  components: {
    TicketsTable,
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch('getTickets', 10);
    });
  },
};
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Mulish', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

svg , img{
  vertical-align: middle;
}

img {
  border-style: none;
  max-width: 100%;
}

.btn {
  padding: 0;
  border: none;
  outline: none;
  font-family: inherit;
  background: transparent;
  cursor: pointer;
}

.main {
  min-width: 1200px;
  min-height: 100vh;
  padding: 30px;
  background: #D1D7ED;
  .section {
    padding: 33px 0 7px;
    border: 1px solid #DFE0EB;
    border-radius: 8px;
    background: #FFFFFF;
    &__top {
      display: flex;
      align-items: center;
      padding: 0 22px 0 33px;
      margin-bottom: 48px;
      &__btn {
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.2px;
        color: #4B506D;
        &:first-of-type {
          margin-right: 32px;
        }

        &-icon {
          margin-right: 10px;
          fill: #C5C7CD;
        }
      }
    }
    &__title {
      margin: 0 auto 0 0;
      font-weight: 700;
      font-size: 19px;
      line-height: 24px;
      letter-spacing: 0.4px;
      color: #252733;
    }
    &__pag {
      display: flex;
      align-items: center;
      justify-content: end;
      padding: 10px;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.3px;
      color: #9FA2B4;
      &-select {
        margin-right: 67px;
        select {
          border: none;
          outline: none;
          color: #4B506D;
        }
      }
      &-info {
        margin-right: 24px;
      }
      &-arrow {
        width: 24px;
        height: 24px;
        background: url("data:image/svg+xml,%3Csvg viewBox='0 0 8 14' width='8' height='14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 13L1.07071 7.07071C1.03166 7.03166 1.03166 6.96834 1.07071 6.92929L7 1' stroke='%239FA2B4' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E%0A") no-repeat center;
        &.arrow-prev {
          margin-right: 12px;
        }
        &.arrow-next {
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>
