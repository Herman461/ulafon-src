<template>
  <base-header />
  <div class="single">
    <template v-if="windowWidth > 767">
      <base-page>
        <template v-slot:first-block>
          <about-block />
        </template>
        <template v-slot:second-block>
          <work-block />
        </template>
        <template v-slot:third-block>
          <collection-block />
        </template>
      </base-page>
    </template>
    <template v-else>
      <work-block />
    </template>
  </div>

</template>


<script>
import AboutBlock from "@/components/blocks/AboutBlock";
import WorkBlock from "@/components/blocks/WorkBlock";
import CollectionBlock from "@/components/blocks/CollectionBlock";
import BasePage from "@/components/BasePage";
import pageInstanceState, {pageStateInit} from "@/pageInstance/page-instance.state";
import BaseHeader from "@/components/common/BaseHeader";

export default {
  name: "SinglePage",
  components: {BaseHeader, BasePage, CollectionBlock, WorkBlock, AboutBlock},
  created() {
    pageStateInit()
  },
  computed: {
    windowWidth() {
      return pageInstanceState.windowWidth
    }
  }
}
</script>
