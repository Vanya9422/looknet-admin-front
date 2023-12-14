<template lang="pug">
	b-modal(
		id="modal-statistic" 
		size="statistic-size" 
		modal-class="modal-statistic" 
		body-class="modal-statistic__body" 
		header-class="modal-statistic__header"
		footer-class="modal-statistic__footer"
		centered 
		:hide-footer="true"
	)
	
		template(#modal-header='{ close }')
			button-close.modal__close(@click.native='close()')
		h3.modal-statistic__title.h3 {{ title }}
		.modal-statistic__table
			table
				thead
					tr
						th(
							v-for="(name, i) in head"
							:key="i"
						) {{name}}
				tbody
					tr(
						v-for="(row, i) in rows"
						:key="i"
					)
						td(
							v-for="(column, i) in row.list" :key="i"
						)
							button-action.modal-statistic__title(:icon="column.icon" :text="column.name" small blue v-if="column.name")
							.modal-statistic__desc(v-if="column.desc") {{column.desc}}
							.modal-statistic__number.color-blue.h3(v-if="column.number") {{column.number}}

</template>

<script>
export default{
	props: {
		title: {
			type: String,
			default: 'Statistics'
		},
		head: {
			type: Array,
			default: () => ([
				'Name',
				'Description',
				'Statistics'
			]),
		},
		rows: {
			type: Array,
			default: () => ([
				{
					list: [
						{
							icon: 'favorites',
							name: 'Favorites',
						},
						{
							desc: 'Tellus elementum sagittis vitae et leo duis ut diam. Libero id faucibus nisl tincidunt eget nullam non nisi. Vitae nunc sed velit dignissim sodales. Ornare arcu dui vivamus arcu felis. ',
						},
						{
							number: '20',
						}
					]
				},
				{
					list: [
						{
							icon: 'view',
							name: 'Views',
						},
						{
							desc: 'Tellus elementum sagittis vitae et leo duis ut diam. Libero id faucibus nisl tincidunt eget nullam non nisi. Vitae nunc sed velit dignissim sodales. ',
						},
						{
							number: '2.1 К',
						}
					]
				},
				{
					list: [
						{
							icon: 'call',
							name: 'Calls',
						},
						{
							desc: 'Tellus elementum sagittis vitae et leo duis ut diam. Libero id faucibus nisl tincidunt eget nullam non nisi. Vitae nunc sed velit dignissim sodales. Ornare arcu dui vivamus arcu felis. ',
						},
						{
							number: '9',
						}
					]
				}
			])
		}
	}
}
</script>

<style lang="scss">
.modal-statistic {
	.modal-content {
		padding: 50rem;
	}

	&__title {
		font-weight: 600;
	}

	&__table {
		margin-top: 20rem;
		font-size: 16rem;
		line-height: 1.2;
		table, tr, thead, tbody, th, td {
			border-collapse: collapse;
		}
		table {
			width: 100%;
		}
		td, th {
			vertical-align: top;
			&:first-child {
				width: 20%;
			}
			&:nth-child(2) {
				width: 63%;
				padding-left: 20rem;
				padding-right: 20rem;
			}
			&:last-child {
				width: 17%;
				text-align: right;
			}
		}
		th {
			font-weight: 500;
			color: $gray;
			padding-bottom: 10rem;
		}
		tr:not(:last-child) {
			td {
				padding-bottom: 30rem;
			}
		}
		td {
			padding-top: 14rem;
			border-top: 1px solid $light-gray;
		}
	}

	&__number {
		font-family: 'Atyp Display';
		font-weight: 600;
	}
}
</style>