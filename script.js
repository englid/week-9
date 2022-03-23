let data=[
    {"parentColumn": "",  "childColumn":"A"},
    {"parentColumn": "A", "childColumn":"B"},
    {"parentColumn": "A", "childColumn":"C"},
    {"parentColumn": "B", "childColumn":"D","val":30},
    {"parentColumn": "B", "childColumn":"E","val":50},
    {"parentColumn": "C", "childColumn":"F","val":20},
    {"parentColumn": "C", "childColumn":"G","val":40},
    {"parentColumn": "C", "childColumn":"H","val":60}
];

let root = null;
let node_map = {};

data.forEach((d) => {
    let node = {name:d.childColumn, children:[], value:d.val};
    node_map[node.name] = node;
    if(!d.parentColumn){
        root = node
    }
    else{
        node_map[d.parentColumn].children.push(node);
    }
});

function calculatevalues(node){
    if(!node.value){
        node.value = 0
        node.children.forEach((c) => {
            node.value += calculatevalues(c);
        });
    }
    return node.value;
}
calculatevalues(root);


let dom = document.getElementById("container");
let treeMap = echarts.init(dom);
treeMap.setOption({
    title: {
        text: 'Week 9 Assignment',
        left: 'center'
    },
    series: [{
        name: 'Treemap',
        type: 'treemap',
        label: {
            show: true,
            formatter: '{b} - {c}',
            fontSize: 16
        },
        upperLabel: {
            show: true,
            height: 40,
            formatter: '{b} - {c}',
            fontSize: 16
        },
        levels: [{
            itemStyle: {
                borderWidth: 20
            },
            upperLabel: {
                show: false
            }
        }, {
            itemStyle: {
                borderColor: '#283F3B',
                borderWidth: 50,
                gapWidth: 5
            },
        }, {
            itemStyle: {
                borderColor: '#556F44',
                borderWidth: 50,
                gapWidth: 5
            },
        }, {
            itemStyle: {
                color: "#659B5E",
                borderWidth: 5,
                gapWidth: 5
            },
        }],
        data: [root]
    }]
});