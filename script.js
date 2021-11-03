import { createApp, ref, onMounted, computed } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.4/vue.esm-browser.min.js'

createApp({
    setup() {
        // 初始化 echart.js
        function drawEchart() {
            let chartDom = document.getElementById('radarBox');
            let myChart = echarts.init(chartDom);
            let option;

            option = {
                radar: {
                    // 雷達配置
                    indicator: [
                        { name: 'HP', max: 15 },
                        { name: '攻擊', max: 15 },
                        { name: '防禦', max: 15 },
                        { name: '特攻', max: 15 },
                        { name: '特防', max: 15 },
                        { name: '速度', max: 15 }
                    ]
                },

                series: [
                    {
                        type: 'radar',
                        data: randerRadar.value,
                        itemStyle: {
                            color: "#375CAA",
                            borderColor: '#FFCC01'
                        },
                        areaStyle: {
                            color: "#375CAA"
                        },
                    }
                ]
            };

            // setOption 設置解決數據更新圖表重新繪製
            option && myChart.setOption(option, true, false);
        }

        const radarList = ref([
            {
                value: [4, 3, 3, 6, 5, 5],
                name: "巴大蝶"
            },
            {
                value: [2, 3, 2, 6, 3, 5],
                name: "鬼斯"
            },
            {
                value: [3, 3, 4, 5, 4, 4],
                name: "風鈴鈴"
            },
            {
                value: [8, 8, 5, 4, 4, 4],
                name: "穿著熊"
            },
            {
                value: [4, 6, 5, 3, 7, 6],
                name: "謎擬Ｑ"
            },
            {
                value: [9, 7, 6, 9, 7, 6],
                name: "露奈雅拉"
            },
        ])

        const randerRadar = computed(() => {
            return radarList.value.filter(ele => {
                return ele.name === remderPokemon.value.name;
            })
        })

        onMounted(() => {
            drawEchart();
        })

        const dataList = ref([
            { id: 1, imgUrl: "./image/012.png", name: "巴大蝶", titleTxt: "NO.012 巴大蝶" },
            { id: 2, imgUrl: "./image/092.png", name: "鬼斯", titleTxt: "NO.092 鬼斯" },
            { id: 3, imgUrl: "./image/358.png", name: "風鈴鈴", titleTxt: "NO.358 風鈴鈴" },
            { id: 4, imgUrl: "./image/760.png", name: "穿著熊", titleTxt: "NO.760 穿著熊" },
            { id: 5, imgUrl: "./image/778.png", name: "謎擬Ｑ", titleTxt: "NO.778 謎擬Ｑ" },
            { id: 6, imgUrl: "./image/792.png", name: "露奈雅拉", titleTxt: "NO.792 露奈雅拉" },
        ])

        const currentPokemon = ref(1)
        const remderPokemon = computed(() => {
            return dataList.value.find(ele => {
                return ele.id === currentPokemon.value;
            })
        })

        function changePokemon(val) {
            if (val === 1) {
                currentPokemon.value++;
                if (currentPokemon.value > 6) currentPokemon.value = 1;
            } else {
                currentPokemon.value--;
                if (currentPokemon.value < 1) currentPokemon.value = 6;
            }
            drawEchart();
        }

        return {
            remderPokemon,
            changePokemon
        }
    }
}).mount('#app');