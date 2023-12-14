<template lang="pug">
	main.main
		section-commercial(
			:switchers="switchers" 
			title="Type of notification"
			banner 
			deleteButton="this notification"
		)
</template>

<script>
export default {
	data(){
		return{
			switchers: [
				{
					value: 'For correctText',
					text: 'For correctText',
				},
				{
					value: 'For business',
					text: 'For business',
					checked: true
				},
			],
		}
	}
}
</script>
