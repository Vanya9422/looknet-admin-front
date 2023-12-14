<template>
  <form class="correct-text__section-list" id="correct-text__section-form" v-if="loading" :key="key">
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">show</div>
            <div class="correct-text__label correct-text__label_small"> show</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Number</div>
            </div>
            <form-input
              class="correct-text__input"
              v-model="content.show.number"
              @input="$v.content.show.number.$touch()"
              :error="$v.content.show.number.$error"
            />
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">More</div>
            </div>
            <form-input
              class="correct-text__input"
              v-model="content.show.more"
              @input="$v.content.show.more.$touch()"
              :error="$v.content.show.more.$error"
            />
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Message</div>
            </div>
            <form-input
              class="correct-text__input"
              v-model="content.message"
              @input="$v.content.message.$touch()"
              :error="$v.content.message.$error"
            />
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Send Message</div>
            </div>
            <form-input
              class="correct-text__input"
              v-model="content.sendMessage"
              @input="$v.content.sendMessage.$touch()"
              :error="$v.content.sendMessage.$error"
            />
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Registered</div>
            </div>
            <form-input
              class="correct-text__input"
              v-model="content.registered"
              @input="$v.content.registered.$touch()"
              :error="$v.content.registered.$error"
            />
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">ID</div>
            </div>
            <form-input
              class="correct-text__input"
              v-model="content.id"
              @input="$v.content.id.$touch()"
              :error="$v.content.id.$error"
            />
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Overview</div>
            </div>
            <form-input
              class="correct-text__input"
              v-model="content.overview"
              @input="$v.content.overview.$touch()"
              :error="$v.content.overview.$error"
            />
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">description</div>
            </div>
            <form-input
              class="correct-text__input"
              v-model="content.description"
              @input="$v.content.description.$touch()"
              :error="$v.content.description.$error"
            />
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">openModalBtn</div>
            </div>
            <form-input
              class="correct-text__input"
              v-model="content.openModalBtn"
              @input="$v.content.openModalBtn.$touch()"
              :error="$v.content.openModalBtn.$error"
            />
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">onMap</div>
            </div>
            <form-input class="correct-text__input" v-model="content.onMap" @input="$v.content.onMap.$touch()" :error="$v.content.onMap.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">hideMap</div>
            </div>
            <form-input class="correct-text__input" v-model="content.hideMap" @input="$v.content.hideMap.$touch()" :error="$v.content.hideMap.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">more</div>
            </div>
            <form-input class="correct-text__input" v-model="content.more" @input="$v.content.more.$touch()" :error="$v.content.more.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">recommend</div>
            </div>
            <form-input class="correct-text__input" v-model="content.recommend" @input="$v.content.recommend.$touch()" :error="$v.content.recommend.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Show More Product</div>
            </div>
            <form-input class="correct-text__input" v-model="content.showMoreProduct" @input="$v.content.showMoreProduct.$touch()" :error="$v.content.showMoreProduct.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Close modal</div>
            </div>
            <form-input class="correct-text__input" v-model="content.close" @input="$v.content.close.$touch()" :error="$v.content.close.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Description show</div>
            </div>
            <form-input class="correct-text__input" v-model="content.moreDesc" @input="$v.content.moreDesc.$touch()" :error="$v.content.moreDesc.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Description hide</div>
            </div>
            <form-input class="correct-text__input" v-model="content.hideDesc" @input="$v.content.hideDesc.$touch()" :error="$v.content.hideDesc.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Km</div>
            </div>
            <form-input class="correct-text__input" v-model="content.km" @input="$v.content.km.$touch()" :error="$v.content.km.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Available cost</div>
            </div>
            <form-input class="correct-text__input" v-model="content.available_cost" @input="$v.content.available_cost.$touch()" :error="$v.content.available_cost.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <correct-text-save @save="save()"></correct-text-save>
  </form>
</template>

<script>
import constructorPage from "@/mixins/constructorPage";
import productDetails from "@/mixins/pages/product-details";
export default {
  mixins:[constructorPage,productDetails],
}
</script>

<style scoped>
.commercial__field-rows {
  align-items: flex-end;
}
</style>
