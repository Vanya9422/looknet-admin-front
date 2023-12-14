<template lang="pug">
	main.main
		part-correct-head
		section-correct-text
			.correct-text__section-list
				.correct-text__section
					.correct-text__row.flex
						.correct-text__column.correct-text__column_left
							.correct-text__label.h3.tablet-hidden Page title
						.correct-text__column.correct-text__column_right
							.correct-text__field
								.correct-text__field-head.flex.flex_vertical.flex_justify
									.correct-text__field-title.h4 H1 header
									.correct-text__label.correct-text__label_small.min-tablet-hidden Page title
								form-input.correct-text__input(value="Support page")
				.correct-text__section
					.correct-text__row.flex
						.correct-text__column.correct-text__column_left
							.correct-text__label.h3.tablet-hidden Category 1
						.correct-text__column.correct-text__column_right
							.correct-text__field
								.correct-text__field-head.flex.flex_vertical.flex_justify
									.correct-text__field-title.h4 Category 1
								form-input.correct-text__input(value="How it works?")
							.correct-text__question
								.correct-text__field
									.correct-text__field-title.h4 Question 1
									part-correct-field.correct-text__input(value="How it works?")
									form-textarea.correct-text__textarea(placeholder="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem n")
								.correct-text__field
									.correct-text__field-title.h4 Question 2
									part-correct-field.correct-text__input(value="Safety?")
									form-textarea.correct-text__textarea(placeholder="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem n")
								button-primary.correct-text__more(gray icon="plusBig") Add a question
				.correct-text__section
					.correct-text__row.flex
						.correct-text__column.correct-text__column_left
							.correct-text__label.h3.tablet-hidden Category 2
						.correct-text__column.correct-text__column_right
							.correct-text__field
								.correct-text__field-head.flex.flex_vertical.flex_justify
									.correct-text__field-title.h4 Category 2
								form-input.correct-text__input(value="Beware of scrammers!")
							.correct-text__question
								.correct-text__field
									.correct-text__field-title.h4 How is electricity saved?
									part-correct-field.correct-text__input(value="How it works?")
									form-textarea.correct-text__textarea(placeholder="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem n")
								button-primary.correct-text__more(gray icon="plusBig") Add a question
				.correct-text__section
					.correct-text__row.flex.flex_vertical
						.correct-text__column.correct-text__column_left
							.correct-text__label.h3 Category 2
						.correct-text__column.correct-text__column_right
							button-primary.correct-text__add(gray icon="plusBig") New category
				.correct-text__section
					.correct-text__row.flex
						.correct-text__column.correct-text__column_left
							.correct-text__label.h3.tablet-hidden Banner
						.correct-text__column.correct-text__column_right
							.correct-text__field
								.correct-text__field-head.flex.flex_vertical.flex_justify
									.correct-text__field-title.h4 H2 header
									.correct-text__label.correct-text__label_small.min-tablet-hidden Banner
								form-input.correct-text__input(value="Need help")
							.correct-text__field
								.correct-text__field-head.flex.flex_vertical.flex_justify
									.correct-text__field-title.h4 Description
								form-textarea.correct-text__textarea(placeholder="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem n")
							.correct-text__field
								.correct-text__field-head.flex.flex_vertical.flex_justify
									.correct-text__field-title.h4 Contact Us
								form-textarea.correct-text__textarea(placeholder="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem n")
				
</template>
