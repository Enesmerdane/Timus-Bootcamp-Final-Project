<template>
    <!-- <h3>Factory List Table Page {{username}}</h3>
    <button @click='navigateEdit'>Edit</button> -->
    <!-- <div style="margin:10px;">
        {{factoryStore.getFactoryList}}

        <br>
        <br>
        <br>

        {{Object.keys(factoryStore.getFactoryList[0])}}

        <br>
        <br>
        <br>

        {{getColumnNamesAndTypes()}}
        {{factoryStore.getFactoryTableColumnTypes}}

    </div> -->
    <h1 class="page-title">Factory List</h1>
    <button class="remove_button" @click="handleRemoveButton">{{setRemoveButtonText}}</button>
    <button class="remove_button" @click="handleAddColumnAction">Add column</button>
    <div class="table-wrapper">
        <table class="fl-table">
            <thead>
                <!-- <tr class="header">
                    <th v-for="(column, index) in factoryStore.getFactoryTableColumnTypes" :key="index"><div>{{column.column_name}}</div></th> 
                </tr> -->
                <tr class="header">
                    <th v-for="(keyVal, index) in getPropsForColumns()" :key="keyVal">
                        <div>
                            {{keyVal}}
                            <button class="remove_button_table" v-if="index >= 4 && removingColumn" @click="handleRemoveAction(keyVal)">Delete</button>
                        </div>
                    </th> 
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in factoryStore.getFactoryList" :key="row.id">
                    <!-- {{row[index]}} -->
                    <td v-for="keyVal in getPropsForColumns()" :key="keyVal">{{row[keyVal] || '-'}}</td>
                    <td>
                        <button @click="()=>{handleEdit(row.id)}">Edit</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="link-container">
            <div class="link-container-link">
                <RouterLink to='/factorylist?page=2'>2</RouterLink>
            </div>
            <div class="link-container-link">
                <RouterLink to='/factorylist?page=1'>1</RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useFactoryStore } from '../stores/factory'
import { usePageStore } from '../stores/pageState'

export default {
    data(){
        return {
            removingColumn: false
        }
    },
    created(){
        //console.log(this.factoryStore.getFactoryTableColumnTypes);
    },
    beforeRouteEnter(to, from){
        const authStore = useAuthStore()
        if(!authStore.getUserId){
            return '/login';
        }

        const pageStore= usePageStore()
        pageStore.setShowError(false)
    },
    computed:{
        setRemoveButtonText(){
            return this.removingColumn ? 'Cancel' : 'Remove column'
        }
    },
    methods: {
        handleEdit(id){
            this.$router.push({
                name: 'factorylistedit',
                params: { factory_id: id}
            })
        },
        handleAddColumnAction(){
            this.$router.push('factorylist/addcolumn')
        },
        handleRemoveAction(columnName){
            const factoryStore = useFactoryStore()
            const pageStore = usePageStore()
            pageStore.setLoading(true)
            factoryStore.deleteColumnFactoryTable(columnName)
            factoryStore.loadFactoryList(1)
            this.$router.push('factorylist')
        },
        handleRemoveButton(){
            this.removingColumn = ! this.removingColumn;
        },
        getPropsForColumns(){
            //console.log(Object.keys(this.factoryStore.getFactoryList[0]).filter((val)=> val !== 'id'));
            return Object.keys(this.factoryStore.getFactoryList[0]).filter((val)=> val !== 'id')
        },
        navigateEdit(){
            this.$router.push(`factorylist/edit/${123123}`)
        },
        getColumnNamesAndTypes(){
            const keys = Object.keys(this.factoryStore.getFactoryList[0])
            let types = []
            keys.forEach((val, index)=>{
                types.push(typeof this.factoryStore.getFactoryList[0][val])
            })

            return {keys, types}
        }
    },
    beforeCreate(){
        this.pageStore.setLoading(true)

        const pageQuery = this.$route.query.page ? this.$route.query.page : 1

        this.factoryStore.loadFactoryList(pageQuery)

        this.pageStore.setLoading(true)

    },
    setup(){
        const authStore = useAuthStore()
        const factoryStore = useFactoryStore()
        const pageStore = usePageStore()

        return {
            authStore,
            factoryStore,
            pageStore
        }
    },
    watch: {
    '$route.query': {
        handler(newValue) {
            //console.log(newValue);
   
            this.factoryStore.loadFactoryList(Number(newValue.page))
        },
        immediate: true,
    }
}
}
</script>

<style scoped>
.remove_button_table {
    margin-bottom: 10px;
    margin-left: 10px
}

.remove_button_table{
  appearance: none;
  background-color: #fe5339;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 10px;
  font-weight: 600;
  line-height: 20px;
  padding: 2px 6px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  width: 60px;
}

.remove_button_table:focus:not(:focus-visible):not(.focus-visible) {
  box-shadow: none;
  outline: none;
}

.remove_button_table:hover {
  background-color: #fa7c68;
}

.remove_button_table:focus {
  box-shadow: rgba(160, 42, 21, 0.4) 0 0 0 3px;
  outline: none;
}

.remove_button_table:disabled {
  background-color: #ed5454;
  border-color: rgba(27, 31, 35, .1);
  color: rgba(255, 255, 255, .8);
  cursor: default;
}

.remove_button_table:active {
  background-color: #298e46;
  box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
}
xxxxx
.remove_button {
    margin-bottom: 10px;
    margin-left: 10px
}

.remove_button{
  appearance: none;
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  width: 150px;
  margin-right: 10px;
}

.remove_button:focus:not(:focus-visible):not(.focus-visible) {
  box-shadow: none;
  outline: none;
}

.remove_button:hover {
  background-color: #2c974b;
}

.remove_button:focus {
  box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
  outline: none;
}

.remove_button:disabled {
  background-color: #94d3a2;
  border-color: rgba(27, 31, 35, .1);
  color: rgba(255, 255, 255, .8);
  cursor: default;
}

.remove_button:active {
  background-color: #298e46;
  box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
}
.page-title {
    font-size: 40px;
    text-align: center;
}

.link-container{
    text-align: right;
    display:flex;
    flex-direction: row-reverse;
}

.link-container-link{
    margin: 2px 5px;
}

/* Table Styles */
.table-wrapper{
    margin: 10px 70px 70px;
    box-shadow: 0px 5px 5px rgba( 0, 0, 0, 0.2 );
}

.fl-table {
    border-radius: 5px;
    font-size: 12px;
    font-weight: normal;
    border: none;
    /* border-collapse: collapse; */
    width: 100%;
    max-width: 80%;
    white-space: nowrap;
    background-color: white;
}

.fl-table td, .fl-table th {
    text-align: center;
    padding: 8px;
}

.fl-table td {
    border-right: 1px solid #f8f8f8;
    font-size: 12px;
}

.fl-table thead th {
    color: #ffffff;
    background: #4FC3A1;
}


.fl-table thead th:nth-child(odd) {
    color: #ffffff;
    background: #324960;
}

.fl-table tr:nth-child(even) {
    background: #F8F8F8;
}

/* Responsive */

@media (max-width: 767px) {
    .fl-table {
        display: block;
        width: 100%;
    }
    .table-wrapper:before{
        content: "Scroll horizontally >";
        display: block;
        text-align: right;
        font-size: 11px;
        color: white;
        padding: 0 0 10px;
    }
    .fl-table thead, .fl-table tbody, .fl-table thead th {
        display: block;
    }
    .fl-table thead th:last-child{
        border-bottom: none;
    }
    .fl-table thead {
        float: left;
    }
    .fl-table tbody {
        width: auto;
        position: relative;
        overflow-x: auto;
    }
    .fl-table td, .fl-table th {
        padding: 20px .625em .625em .625em;
        height: 60px;
        vertical-align: middle;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
        width: 120px;
        font-size: 13px;
        text-overflow: ellipsis;
    }
    .fl-table thead th {
        text-align: left;
        border-bottom: 1px solid #f7f7f9;
    }
    .fl-table tbody tr {
        display: table-cell;
    }
    .fl-table tbody tr:nth-child(odd) {
        background: none;
    }
    .fl-table tr:nth-child(even) {
        background: transparent;
    }
    .fl-table tr td:nth-child(odd) {
        background: #F8F8F8;
        border-right: 1px solid #E6E4E4;
    }
    .fl-table tr td:nth-child(even) {
        border-right: 1px solid #E6E4E4;
    }
    .fl-table tbody td {
        display: block;
        text-align: center;
    }
}

</style>