<template>
  <form class="correct-text__section-list" id="correct-text__section-form" v-if="loading">
    <h3 class="correct-text__label h3 tablet-hidden">Add Product</h3>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Add Gallery</div>
            <div class="correct-text__label correct-text__label_small"> Add Gallery</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Title</div>
            </div>
            <form-input class="correct-text__input" v-model="content.addGallery.title" @input="$v.content.addGallery.title.$touch()" :error="$v.content.addGallery.title.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Skip text 1</div>
            </div>
            <form-input class="correct-text__input" v-model="content.addGallery.skip1" @input="$v.content.addGallery.skip1.$touch()" :error="$v.content.addGallery.skip1.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Skip text 2</div>
            </div>
            <form-input class="correct-text__input" v-model="content.addGallery.skip2" @input="$v.content.addGallery.skip2.$touch()" :error="$v.content.addGallery.skip2.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">skip step</div>
            </div>
            <form-input class="correct-text__input" v-model="content.addGallery.title" @input="$v.content.addGallery.title.$touch()" :error="$v.content.addGallery.title.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Description</div>
            </div>
            <form-input class="correct-text__input" v-model="content.addGallery.description" @input="$v.content.addGallery.description.$touch()" :error="$v.content.addGallery.description.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4"> Description Hover</div>
            </div>
            <form-input class="correct-text__input" v-model="content.addGallery.subTitle" @input="$v.content.addGallery.subTitle.$touch()" :error="$v.content.addGallery.subTitle.$error"></form-input>
          </div>
          <div class="correct-text__field" v-for="(item,index) in content.addGallery.list" :key="'addGallery-'+index">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Info item {{index + 1}}</div>
            </div>
            <form-input class="correct-text__input" v-model="item.text" @input="$v.content.addGallery.list.$each[index].text.$touch()" :error="$v.content.addGallery.list.$each[index].text.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Add Gallery Modal</div>
            <div class="correct-text__label correct-text__label_small"> Add Gallery Modal</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Title</div>
            </div>
            <form-input class="correct-text__input" v-model="content.addGalleryModal.title" @input="$v.content.addGalleryModal.title.$touch()" :error="$v.content.addGalleryModal.title.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Description</div>
            </div>
            <form-input class="correct-text__input" v-model="content.addGalleryModal.description" @input="$v.content.addGalleryModal.description.$touch()" :error="$v.content.addGalleryModal.description.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Checkbox</div>
            </div>
            <form-input class="correct-text__input" v-model="content.addGalleryModal.checkbox" @input="$v.content.addGalleryModal.checkbox.$touch()" :error="$v.content.addGalleryModal.checkbox.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Close</div>
            </div>
            <form-input class="correct-text__input" v-model="content.addGalleryModal.btnClose" @input="$v.content.addGalleryModal.btnClose.$touch()" :error="$v.content.addGalleryModal.btnClose.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Save</div>
            </div>
            <form-input class="correct-text__input" v-model="content.addGalleryModal.btnSave" @input="$v.content.addGalleryModal.btnSave.$touch()" :error="$v.content.addGalleryModal.btnSave.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <h3 class="correct-text__label h3 tablet-hidden">Form</h3>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Title</div>
            <div class="correct-text__label correct-text__label_small"> Title</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Label</div>
            </div>
            <form-input class="correct-text__input" v-model="content.form.title.label" @input="$v.content.form.title.label.$touch()" :error="$v.content.form.title.label.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Placeholder</div>
            </div>
            <form-input class="correct-text__input" v-model="content.form.title.placeholder" @input="$v.content.form.title.placeholder.$touch()" :error="$v.content.form.title.placeholder.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Description</div>
            <div class="correct-text__label correct-text__label_small"> Description</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Label</div>
            </div>
            <form-input class="correct-text__input" v-model="content.form.description.label" @input="$v.content.form.description.label.$touch()" :error="$v.content.form.description.label.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Placeholder</div>
            </div>
            <form-input class="correct-text__input" v-model="content.form.description.placeholder" @input="$v.content.form.description.placeholder.$touch()" :error="$v.content.form.description.placeholder.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Price</div>
            <div class="correct-text__label correct-text__label_small"> Price</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Placeholder</div>
            </div>
            <form-input class="correct-text__input" v-model="content.form.price.placeholder" @input="$v.content.form.price.placeholder.$touch()" :error="$v.content.form.price.placeholder.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Checkbox</div>
            <div class="correct-text__label correct-text__label_small"> Checkbox</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Checkbox</div>
            </div>
            <form-input class="correct-text__input" v-model="content.form.checkbox" @input="$v.content.form.checkbox.$touch()" :error="$v.content.form.checkbox.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Nav</div>
            <div class="correct-text__label correct-text__label_small"> Nav</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field" v-for="(item,index) in content.form.nav" :key="'form-nav-'+index">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Nav item {{index + 1}}</div>
            </div>
            <form-input class="correct-text__input" v-model="item.text" @input="$v.content.form.nav.$each[index].text.$touch()" :error="$v.content.form.nav.$each[index].text.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Gallery</div>
            <div class="correct-text__label correct-text__label_small"> Gallery</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Pin</div>
            </div>
            <form-input class="correct-text__input" v-model="content.form.gallery.pin" @input="$v.content.form.gallery.pin.$touch()" :error="$v.content.form.gallery.pin.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Main</div>
            </div>
            <form-input class="correct-text__input" v-model="content.form.gallery.main" @input="$v.content.form.gallery.main.$touch()" :error="$v.content.form.gallery.main.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Drop</div>
            </div>
            <form-input class="correct-text__input" v-model="content.form.gallery.drop" @input="$v.content.form.gallery.drop.$touch()" :error="$v.content.form.gallery.drop.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Exceeding the number of photos error</div>
            </div>
            <form-input class="correct-text__input" v-model="content.form.gallery.error" @input="$v.content.form.gallery.error.$touch()" :error="$v.content.form.gallery.error.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <h3 class="correct-text__label h3 tablet-hidden">Category</h3>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Title</div>
            <div class="correct-text__label correct-text__label_small"> Title</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Title</div>
            </div>
            <form-input class="correct-text__input" v-model="content.category.title" @input="$v.content.category.title.$touch()" :error="$v.content.category.title.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Form</div>
            <div class="correct-text__label correct-text__label_small"> Form</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Search</div>
            </div>
            <form-input class="correct-text__input" v-model="content.category.search" @input="$v.content.category.search.$touch()" :error="$v.content.category.search.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Search (Placeholder)</div>
            </div>
            <form-input class="correct-text__input" v-model="content.category.searchPlaceholder" @input="$v.content.category.searchPlaceholder.$touch()" :error="$v.content.category.searchPlaceholder.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Back</div>
            </div>
            <form-input class="correct-text__input" back v-model="content.category.back" @input="$v.content.category.back.$touch()" :error="$v.content.category.back.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Cancel</div>
            </div>
            <form-input class="correct-text__input" v-model="content.category.cancel" @input="$v.content.category.cancel.$touch()" :error="$v.content.category.cancel.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Modal 2</div>
            <div class="correct-text__label correct-text__label_small"> Modal 2</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Title</div>
            </div>
            <form-input class="correct-text__input" v-model="content.mainCategory.title" @input="$v.content.mainCategory.title.$touch()" :error="$v.content.mainCategory.title.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Edit</div>
            </div>
            <form-input class="correct-text__input" v-model="content.mainCategory.edit" @input="$v.content.mainCategory.edit.$touch()" :error="$v.content.mainCategory.edit.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">All categories</div>
            </div>
            <form-input class="correct-text__input" v-model="content.mainCategory.all" @input="$v.content.mainCategory.all.$touch()" :error="$v.content.mainCategory.all.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Selected City (Placeholder)</div>
            </div>
            <form-input class="correct-text__input" v-model="content.mainCategory.selectedPlaceholder" @input="$v.content.mainCategory.selectedPlaceholder.$touch()" :error="$v.content.mainCategory.selectedPlaceholder.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Link</div>
            <div class="correct-text__label correct-text__label_small"> Link</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Label</div>
            </div>
            <form-input class="correct-text__input" v-model="content.mainCategory.link.label" @input="$v.content.mainCategory.link.label.$touch()" :error="$v.content.mainCategory.link.label.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Placeholder</div>
            </div>
            <form-input class="correct-text__input" v-model="content.mainCategory.link.placeholder" @input="$v.content.mainCategory.link.placeholder.$touch()" :error="$v.content.mainCategory.link.placeholder.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Address</div>
            <div class="correct-text__label correct-text__label_small"> Address</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Label</div>
            </div>
            <form-input class="correct-text__input" v-model="content.mainCategory.address.label" @input="$v.content.mainCategory.address.label.$touch()" :error="$v.content.mainCategory.address.label.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Placeholder</div>
            </div>
            <form-input class="correct-text__input" v-model="content.mainCategory.address.placeholder" @input="$v.content.mainCategory.address.placeholder.$touch()" :error="$v.content.mainCategory.address.placeholder.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Map</div>
            </div>
            <form-input class="correct-text__input" v-model="content.mainCategory.address.map" @input="$v.content.mainCategory.address.map.$touch()" :error="$v.content.mainCategory.address.map.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Hide address</div>
            <div class="correct-text__label correct-text__label_small"> Hide address</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Label</div>
            </div>
            <form-input class="correct-text__input" v-model="content.mainCategory.address.hideAddress.label" @input="$v.content.mainCategory.address.hideAddress.label.$touch()" :error="$v.content.mainCategory.address.hideAddress.label.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Placeholder</div>
            </div>
            <form-input class="correct-text__input" v-model="content.mainCategory.address.hideAddress.placeholder" @input="$v.content.mainCategory.address.hideAddress.placeholder.$touch()" :error="$v.content.mainCategory.address.hideAddress.placeholder.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Placeholder</div>
            </div>
            <form-input class="correct-text__input" v-model="content.mainCategory.address.hideAddress.info" @input="$v.content.mainCategory.address.hideAddress.info.$touch()" :error="$v.content.mainCategory.address.hideAddress.info.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Phone</div>
            <div class="correct-text__label correct-text__label_small"> Phone</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Label</div>
            </div>
            <form-input class="correct-text__input" v-model="content.mainCategory.phone.label" @input="$v.content.mainCategory.phone.label.$touch()" :error="$v.content.mainCategory.phone.label.$error"></form-input>
          </div>
          <div class="correct-text__field" v-for="(item,index) in content.mainCategory.phone.list" :key="'mainCategory-phone-'+index">
            <div class="correct-text__field">
              <div class="correct-text__field-head flex flex_vertical flex_justify">
                <div class="correct-text__field-title h4">Phone list</div>
              </div>
              <form-input class="correct-text__input" v-model="item.text" @input="$v.content.mainCategory.phone.list.$each[index].text.$touch()" :error="$v.content.mainCategory.phone.list.$each[index].text.$error"></form-input>
            </div>
            <div class="correct-text__field">
              <div class="correct-text__field-head flex flex_vertical flex_justify">
                <div class="correct-text__field-title h4">Phone info</div>
              </div>
              <form-input class="correct-text__input" v-model="item.info" @input="$v.content.mainCategory.phone.list.$each[index].info.$touch()" :error="$v.content.mainCategory.phone.list.$each[index].info.$error"></form-input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Renewal</div>
            <div class="correct-text__label correct-text__label_small"> Renewal</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Label</div>
            </div>
            <form-input class="correct-text__input" v-model="content.mainCategory.renewal.label" @input="$v.content.mainCategory.renewal.label.$touch()" :error="$v.content.mainCategory.renewal.label.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Placeholder</div>
            </div>
            <form-input class="correct-text__input" v-model="content.mainCategory.renewal.placeholder" @input="$v.content.mainCategory.renewal.placeholder.$touch()" :error="$v.content.mainCategory.renewal.placeholder.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Placeholder</div>
            </div>
            <form-input class="correct-text__input" v-model="content.mainCategory.renewal.info" @input="$v.content.mainCategory.renewal.info.$touch()" :error="$v.content.mainCategory.renewal.info.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <div class="correct-text__section">
      <div class="correct-text__row flex">
        <div class="correct-text__column correct-text__column_left">
          <div class="correct-text__section-head flex flex_vertical flex_justify">
            <div class="correct-text__label h4 min-tablet-hidden">Buttons</div>
            <div class="correct-text__label correct-text__label_small"> Buttons</div>
          </div>
        </div>
        <div class="correct-text__column correct-text__column_right">
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Cancel</div>
            </div>
            <form-input class="correct-text__input" v-model="content.mainCategory.buttons.cancel" @input="$v.content.mainCategory.buttons.cancel.$touch()" :error="$v.content.mainCategory.buttons.cancel.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Draft</div>
            </div>
            <form-input class="correct-text__input" v-model="content.mainCategory.buttons.draft" @input="$v.content.mainCategory.buttons.draft.$touch()" :error="$v.content.mainCategory.buttons.draft.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Save</div>
            </div>
            <form-input class="correct-text__input" v-model="content.mainCategory.buttons.save" @input="$v.content.mainCategory.buttons.save.$touch()" :error="$v.content.mainCategory.buttons.save.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Skip</div>
            </div>
            <form-input class="correct-text__input" v-model="content.mainCategory.buttons.skip" @input="$v.content.mainCategory.buttons.skip.$touch()" :error="$v.content.mainCategory.buttons.skip.$error"></form-input>
          </div>
          <div class="correct-text__field">
            <div class="correct-text__field-head flex flex_vertical flex_justify">
              <div class="correct-text__field-title h4">Next</div>
            </div>
            <form-input class="correct-text__input" v-model="content.mainCategory.buttons.next" @input="$v.content.mainCategory.buttons.next.$touch()" :error="$v.content.mainCategory.buttons.next.$error"></form-input>
          </div>
        </div>
      </div>
    </div>
    <correct-text-save @save="save()"></correct-text-save>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { minLength, required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      loading: false,
      id: null,
      content: {
        addGallery:{
          title: 'What do you want to sell?',
          skip1: 'Upload images or',
          skip2: 'this step',
          subTitle: 'Click to upload or drop a photo',
          description: 'The first photo will be displayed in the search results, choose the most successful one',
          list:[
            {text:'You can upload up to 10 photos'},
            {text:'Format JPG or PNG format'},
            {text:'Only upload media you own the rights to'},
            {text:'The maximum photo size is 25MB.'},
          ]
        },
        addGalleryModal:{
          title: 'Add photos?',
          description: 'Are you sure you want to continue without photos? People view ads with a photo more often by 60%',
          checkbox: 'Don’t ask me again',
          btnClose:'Not now',
          btnSave:'Add a photo'
        },
        form:{
          title:{
            label:'Name advertise',
            placeholder:'Name of advertise'
          },
          description:{
            label:'Description',
            placeholder:'Tell us about the product'
          },
          price:{
            placeholder:'$ 0.00'
          },
          checkbox:'Availabale cost',
          nav: [
            {
              text: 'Cost',
              status:1,
            },
            {
              text: 'For free',
              status: 0,
            },
            {
              text: 'Exchange',
              status: 2,
            },
            {
              text: 'Contractual',
              status: 3,
            },
          ],
          gallery:{
            pin:'сделать главной',
            main:'main photo',
            drop:'Drag to change the cover',
            error:'Max photo length 10, delete images'
          }
        },
        category:{
          title:'Choose category',
          back:'Choose category',
          search:'Search',
          searchPlaceholder:'Search',
          cancel:'Cancel',
        },
        mainCategory:{
          title:'Main category',
          edit:'Edit',
          all:'All categories',
          create:'Creat Advertise',
          recommended:'Recommended category*',
          // selected:'Selected',
          selectedPlaceholder: 'Search',
          // chooseAnotherCategory: 'Choose another category',
          link:{
            label:'Youtube link',
            placeholder:'Sent the url on video'
          },
          address:{
            label:'Enter the address',
            map:'Map',
            placeholder:'Baker street NY 3290# 20001',
            hideAddress: {
              label: 'Hide address',
              placeholder: 'Turn on',
              info: 'Hide address from other users',
            },
          },
          phone:{
            label:'Enter the address',
            list:[
              {text:'Phone and message',status:0,info:'Choose the way for contact with you' },
              {text:'Only phone',status:1,info:'Choose the way for contact with you'},
              {text:'Only message',status:2,info:'Choose the way for contact with you'},
            ]
          },
          renewal:{
            label:'Auto-renewal',
            placeholder:'Turn on',
            info:'Choose the way for contact with you',
          },
          buttons:{
            cancel:'Cancel',
            draft:'Save as Draft',
            // draft1:'Draft',
            // create:'Create',
            save:'Publish now',
            skip:'Skip',
            next:'Next',
            // remove: 'Remove',
          }
        }
      },
    }
  },
  validations: {
    content: {
      addGallery:{
        title: {required, minLength: minLength(2)},
        subTitle: {required, minLength: minLength(2)},
        description: {required, minLength: minLength(2)},
        skip1: {required, minLength: minLength(2)},
        skip2: {required, minLength: minLength(2)},
        list:{
          $each:{
            text: {required, minLength: minLength(2)},
          }
        }
      },
      addGalleryModal:{
        title: {required, minLength: minLength(2)},
        description: {required, minLength: minLength(2)},
        checkbox: {required, minLength: minLength(2)},
        btnClose: {required, minLength: minLength(2)},
        btnSave: {required, minLength: minLength(2)},
      },
      form:{
        title:{
          label:{required, minLength: minLength(2)},
          placeholder:{required, minLength: minLength(2)}
        },
        description:{
          label:{required, minLength: minLength(2)},
          placeholder:{required, minLength: minLength(2)}
        },
        price:{
          placeholder:{required, minLength: minLength(2)},
        },
        checkbox:{required, minLength: minLength(2)},
        nav:{
          $each:{
            text: {required, minLength: minLength(2)},
          }
        },
        gallery:{
          pin:{required, minLength: minLength(2)},
          drop:{required, minLength: minLength(2)},
          error:{required, minLength: minLength(2)},
          main:{required, minLength: minLength(2)}
        },
      },
      category:{
        title:{required, minLength: minLength(2)},
        back:{required, minLength: minLength(2)},
        search:{required, minLength: minLength(2)},
        searchPlaceholder:{required, minLength: minLength(2)},
        cancel:{required, minLength: minLength(2)},
      },
      mainCategory:{
        title:{required, minLength: minLength(2)},
        edit:{required, minLength: minLength(2)},
        all:{required, minLength: minLength(2)},
        create:{required, minLength: minLength(2)},
        recommended:{required, minLength: minLength(2)},
        // selected:{required, minLength: minLength(2)},
        selectedPlaceholder: { required, minLength: minLength(2) },
        // chooseAnotherCategory: { required, minLength: minLength(2) },
        link:{
          label:{required, minLength: minLength(2)},
          placeholder:{required, minLength: minLength(2)}
        },
        address:{
          label:{required, minLength: minLength(2)},
          map:{required, minLength: minLength(2)},
          placeholder:{required, minLength: minLength(2)},
          hideAddress: {
            label:{required, minLength: minLength(2)},
            placeholder:{required, minLength: minLength(2)},
            info:{required, minLength: minLength(2)},
          },
        },
        phone:{
          label:{required, minLength: minLength(2)},
          list:{
            $each:{
              text: {required, minLength: minLength(2)},
              info: {required, minLength: minLength(2)},
            }
          }
        },
        renewal:{
          label:{required, minLength: minLength(2)},
          placeholder:{required, minLength: minLength(2)},
          info:{required, minLength: minLength(2)},
        },
        buttons:{
          cancel:{required, minLength: minLength(2)},
          draft:{required, minLength: minLength(2)},
          // draft1:{required, minLength: minLength(2)},
          // create:{required, minLength: minLength(2)},
          skip:{required, minLength: minLength(2)},
          save:{required, minLength: minLength(2)},
          next:{required, minLength: minLength(2)},
          // remove:{required, minLength: minLength(2)},
        },
      }
    }
  },
  computed: {
    ...mapGetters({
      PAGE: 'correctText/PAGE',
      LANG: 'correctText/LANG',
      TYPE: 'correctText/TYPE',
    })
  },
  watch: {
    LANG(val) {
      this.getInfo()
      this.loading = false
    }
  },
  async mounted() {
    await this.getInfo()
  },
  methods: {
    ...mapActions({
      SAVE_PAGE: 'correctText/SAVE_PAGE'
    }),
    async getInfo() {
      try {
        let key = this.PAGE
        const url = this.$getQuery({
          page_key: key,
          type: this.TYPE
        })
        this.$axios.setHeader('Accept-Language', this.LANG || 'en')

        const {data} = await this.$axios.$get(`${this.$api.page}?${url}`)
        this.id = data.id

        this.content = JSON.parse(data.content)
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = true
      }
    },
    addNewOne(item) {
      const array = {
        label: 1,
        value: ''
      }
      this.content[item].list.push(array)
    },
    deleteOne(item, index) {
      if (this.content[item].list.length > 1) this.content[item].list.splice(index, 1)
    },
    save() {
      this.$v.content.$touch()
      if (!this.$v.content.$error) {
        this.SAVE_PAGE({content: this.content, id: this.id})
      }
    }
  }
}
</script>

<style scoped>
.commercial__field-rows {
  align-items: flex-end;
}
</style>
