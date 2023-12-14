<template lang="pug">
	main.main
		part-correct-head
		section-correct-text
			h3.correct-text__label.h3.tablet-hidden Fill in the fields
			.correct-text__section-list
				.correct-text__section
					.correct-text__row.flex
						.correct-text__column.correct-text__column_left
							.correct-text__section-head.flex.flex_vertical.flex_justify
								.correct-text__label.h4.min-tablet-hidden Fill in the fields
								.correct-text__label.correct-text__label_small Image
						.correct-text__column.correct-text__column_right
							part-replace-photo.correct-text__replace-photo
				.correct-text__section
					.correct-text__row.flex
						.correct-text__column.correct-text__column_left
							.correct-text__label.correct-text__label_small.tablet-hidden Phone
						.correct-text__column.correct-text__column_right
							.correct-text__field
								.correct-text__field-head.flex.flex_vertical.flex_justify
									.correct-text__field-title.h4 H1 header
									.correct-text__label.correct-text__label_small.min-tablet-hidden Phone
								form-input.correct-text__input(value="Contacts")
				.correct-text__section
					.correct-text__row.flex
						.correct-text__column.correct-text__column_left
							.correct-text__label.correct-text__label_small.tablet-hidden Phone
						.correct-text__column.correct-text__column_right
							.correct-text__field
								.correct-text__field-head.flex.flex_vertical.flex_justify
									.correct-text__field-title.h4 H2 header
									.correct-text__label.correct-text__label_small.min-tablet-hidden Phone
								form-input.correct-text__input(value="Phone numbers")
							.correct-text__field
								.correct-text__field-head.flex.flex_vertical.flex_justify
									.correct-text__field-title.h4 Phone numbers 1
									.correct-text__checkboxes.flex.mobile-hidden
										form-checkbox.correct-text__checkbox(checked)
											.p.color-gray For customers
										form-checkbox.correct-text__checkbox
											.p.color-gray For cooperation
								part-correct-field.correct-text__input(value="+1 303 420 00 31")
								.correct-text__checkboxes.flex.mobile-visible
									form-checkbox.correct-text__checkbox(checked)
										.p.color-gray For customers
									form-checkbox.correct-text__checkbox
										.p.color-gray For cooperation
							.correct-text__field
								.correct-text__field-head.flex.flex_vertical.flex_justify
									.correct-text__field-title.h4 Phone numbers 2
									.correct-text__checkboxes.flex.mobile-hidden
										form-checkbox.correct-text__checkbox(checked)
											.p.color-gray For customers
										form-checkbox.correct-text__checkbox
											.p.color-gray For cooperation
								part-correct-field.correct-text__input(value="+1 465 586 48 24")
								.correct-text__checkboxes.flex.mobile-visible
									form-checkbox.correct-text__checkbox(checked)
										.p.color-gray For customers
									form-checkbox.correct-text__checkbox
										.p.color-gray For cooperation
							.correct-text__field
								.correct-text__field-head.flex.flex_vertical.flex_justify
									.correct-text__field-title.h4 Phone numbers 3
									.correct-text__checkboxes.flex.mobile-hidden
										form-checkbox.correct-text__checkbox
											.p.color-gray For customers
										form-checkbox.correct-text__checkbox(checked)
											.p.color-gray For cooperation
								part-correct-field.correct-text__input(value="+1 303 420 00 31")
								.correct-text__checkboxes.flex.mobile-visible
									form-checkbox.correct-text__checkbox
										.p.color-gray For customers
									form-checkbox.correct-text__checkbox(checked)
										.p.color-gray For cooperation
							button-primary.correct-text__more(gray icon="plusBig") One more

				.correct-text__section
					.correct-text__row.flex
						.correct-text__column.correct-text__column_left
							.correct-text__label.correct-text__label_small.tablet-hidden Address
						.correct-text__column.correct-text__column_right
							.correct-text__field
								.correct-text__field-head.flex.flex_vertical.flex_justify
									.correct-text__field-title.h4 H2 header
									.correct-text__label.correct-text__label_small.min-tablet-hidden Address
								form-input.correct-text__input(value="Address")
							.correct-text__field
								.correct-text__field-title.h4 Address 1
								part-correct-field.correct-text__input(value="New Your, 45 Broadway #520 100341")
							button-primary.correct-text__more(gray icon="plusBig") One more
				.correct-text__section
					.correct-text__row.flex
						.correct-text__column.correct-text__column_left
							.correct-text__section-head.flex.flex_vertical.flex_justify
								.correct-text__label.h4.min-tablet-hidden Fill in the fields
								.correct-text__label.correct-text__label_small Image
						.correct-text__column.correct-text__column_right
							part-replace-photo.correct-text__replace-photo
				.correct-text__section
					.correct-text__row.flex
						.correct-text__column.correct-text__column_left
							.correct-text__label.correct-text__label_small.tablet-hidden Banner
						.correct-text__column.correct-text__column_right
							.correct-text__field
								.correct-text__field-head.flex.flex_vertical.flex_justify
									.correct-text__field-title.h4 H2 header
									.correct-text__label.correct-text__label_small.min-tablet-hidden Banner
								form-input.correct-text__input(value="Need help")
							.correct-text__field
								.correct-text__field-title.h4 Description
								form-textarea.correct-text__input(placeholder="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem n")
</template>
