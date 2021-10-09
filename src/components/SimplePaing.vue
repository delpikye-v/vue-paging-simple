<template>
    <ul class="d-simple-paging">
        <!-- eslint-disable-next-line prettier/prettier -->
        <li
            v-for="(data, index) in listPages"
            :key="index"
            :class="{
                active: data.selected,
                first: data.isFirst,
                last: data.isLast
            }"
        >
            <span @click="changePage(data.page, data.selected)" :class="data.className"> {{ data.label }}</span>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        limit: {
            type: [Number, String],
            default: () => 5
        },
        totals: {
            type: [Number, String],
            default: () => 0
        },
        section: {
            type: [Number, String],
            default: () => 5
        },
        value: {
            type: [Number, String],
            default: () => 1
        }
    },
    data() {
        return {}
    },

    computed: {
        listPages() {
            return this.makePage()
        }
    },

    methods: {
        changePage(page, selected) {
            if (selected) {
                return
            }
            this.$emit('input', page)
            // this.$emit('onChange', page)
        },

        makePage() {
            let { limit, totals, section, value } = this
            if (this.totals === 0) {
                return []
            }

            let totalPages = getCounter(totals, limit)
            if (value > totalPages) value = totalPages

            let totalSections = getCounter(totalPages, section)
            let sectionNow = getCounter(value, section)

            // data current section
            let from = (sectionNow - 1) * section + 1
            let to = sectionNow * section
            if (to > totalPages) to = totalPages

            // first page of back section
            // let backPage = from - section
            let backPage = from - 1
            if (backPage < 1) backPage = 1

            // first page of next section
            let nextPage = to + 1
            if (nextPage > totalPages) nextPage = totalPages

            let isFirst = sectionNow === 1
            let isLast = sectionNow === totalSections

            let arrayPage = []
            if (totalPages > section) {
                arrayPage.push({ page: 1, label: '<<', className: 'page page-first', isFirst })
                arrayPage.push({ page: backPage, label: '<', className: 'page page-back', isFirst })
            }
            for (let i = from; i <= to; i++) {
                arrayPage.push({
                    page: i,
                    label: i,
                    className: 'page page-index',
                    selected: value === i
                })
            }
            if (totalPages > section) {
                arrayPage.push({ page: nextPage, label: '>', className: 'page page-next', isLast })
                arrayPage.push({ page: totalPages, label: '>>', className: 'page page-last', isLast })
            }
            return arrayPage
        }
    }
}
function getCounter(totals, split) {
    let counter = Math.floor(totals / split)
    return counter * split !== totals ? counter + 1 : counter
}
</script>

<style>
.d-simple-paging {
    display: flex;
    list-style: none;
    min-height: 21px;
}
.d-simple-paging li {
    min-width: 20px;
    display: flex;
    justify-content: center;
    padding: 3px;
}
.d-simple-paging span {
    color: blue;
    user-select: none;
    cursor: pointer;
}
.d-simple-paging .active * {
    cursor: default;
    pointer-events: none;
    color: black !important;
}
.d-simple-paging .first * {
    cursor: default;
    /* color: gray; */
    pointer-events: none;
    opacity: 0.2;
}
.d-simple-paging .last * {
    cursor: default;
    /* color: gray; */
    pointer-events: none;
    opacity: 0.2;
}
</style>
