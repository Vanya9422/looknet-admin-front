<template lang="pug">
	.container
		.container__row
			.container__column.container__column_left
				part-back-sidebar(:nav="nav")
			.container__column.container__column_right
				.container__inner
					part-header(back)
				Nuxt
				part-mobile-menu
				modal-search
		module-page-helper
</template>
<script>
export default {
  middleware: ['admin'],
	data(){
		return{
			nav: [
				{
					icon: 'apps',
					to: '/announcement-list',
					name: 'Advertises'
				},
				{
					icon: 'user',
					to: '/users',
					name: 'Users'
				},
				{
					icon: 'apps',
					to: '/feedback-list',
					name: 'Feedback'
				},
				{
					icon: 'shield',
					to: '/moderators',
					name: 'Moderators'
				},
				{
					icon: 'editText',
					to: '/сorrect-text',
					name: 'Redaction'
				},
				{
					icon: 'support',
					to: '/support-chat',
					name: 'Support chat',
				},
				{
					icon: 'wallet',
					to: '/commercial',
					name: 'Commercial',
				}
			]
		}
	}
}
</script>
