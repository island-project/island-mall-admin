<template>
  <div class="app-container">
    <div class="header">
      <el-card style="width: 100%" shadow="never">
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
        >
          <el-col :span="2">
            <i
              class="el-icon-search"
              style="margin-right: 5px"
            />
            <span>筛选搜索</span>
          </el-col>
          <el-col :span="20" />
          <el-col
            :span="1"
            style="transform:translateX(-30px)"
          >
            <el-button
              size="small"
              @click="resetSearchForm"
            >重置</el-button>
          </el-col>
          <el-col
            :span="1"
            style="transform:translateX(-20px)"
          >
            <el-button
              type="primary"
              size="small"
              @click="queryResults"
            >查询结果</el-button>
          </el-col>
        </el-row>
        <div class="search-form">
          <el-form
            ref="searchForm"
            hide-required-asterisk
            :inline="true"
            :model="searchForm"
          >
            <el-row>
              <el-col :span="6">
                <el-form-item
                  label="商品名称:"
                  prop="name"
                >
                  <el-input
                    v-model="searchForm.name"
                    clearable
                    placeholder="请输入商品名称"
                    size="small"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="商品货号:"
                  prop="id"
                >
                  <el-input
                    v-model="searchForm.id"
                    clearable
                    placeholder="请输入商品货号"
                    size="small"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="商品分类:"
                  prop="type"
                >
                  <el-select
                    v-model="searchForm.type"
                    clearable
                    size="small"
                    placeholder="请选择商品类型"
                  >
                    <el-option
                      v-for="item in productTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="商品品牌:"
                  prop="brand"
                >
                  <el-select
                    v-model="searchForm.brand"
                    clearable
                    size="small"
                    placeholder="请选择商品品牌"
                  >
                    <el-option
                      v-for="item in productBrandOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item
                  label="上架状态:"
                  prop="isNowInStock"
                >
                  <el-select
                    v-model="searchForm.isNowInStock"
                    size="small"
                    placeholder="请选择上架状态"
                  >
                    <el-option
                      v-for="item in nowInStockOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="推荐状态:"
                  prop="isRecommend"
                >
                  <el-select
                    v-model="searchForm.isRecommend"
                    size="small"
                    placeholder="请选择推荐状态"
                  >
                    <el-option
                      v-for="item in recommendOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" />
            </el-row>
          </el-form>
        </div>

      </el-card>
    </div>
    <div class="main-title">
      <el-card shadow="never">
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
        >
          <el-col :span="2">
            <div style="margin: auto 0 auto 0">
              <i
                class="el-icon-document-copy"
                style="margin-right: 5px;height: 100%;"
              />
              <span style="height: 100%;">数据列表</span>
            </div>
          </el-col>
          <el-col :span="21" />
          <el-col :span="1">
            <el-button size="small">添加</el-button>
          </el-col>
        </el-row>

      </el-card>
    </div>
    <div class="main-product-list">
      <el-card shadow="never" :body-style="{padding: '0'}">
        <el-table v-loading="loading" :data="productList" border>
          <el-table-column type="selection" align="center" />
          <el-table-column label="编号" prop="id" align="center" width="75" :resizable="false" />
          <el-table-column label="商品图片" align="center" width="150" :resizable="false">
            <template slot-scope="scope">
              <el-image :src="scope.row.mainImage" fit="fill" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name" align="center" />
          <el-table-column label="价格/货号" align="center">
            <template slot-scope="scope">
              <el-tag effect="plain">价格: {{ scope.row.price }} 元</el-tag>
              <p>货号: {{ scope.row.artNo }}</p>
            </template>
          </el-table-column>
          <el-table-column label="标签" prop="" align="center">
            <template slot-scope="scope">
              <el-row align="middle" style="margin: 10px 0">
                <span style="margin: 0 5px 0 0">上架: </span>
                <el-switch v-model="scope.row.isInStock" />
              </el-row>
              <el-row align="middle" style="margin: 10px 0">
                <span style="margin: 0 5px 0 0">新品: </span>
                <el-switch v-model="scope.row.isNew" />
              </el-row>
              <el-row align="middle" style="margin: 10px 0">
                <span style="margin: 0 5px 0 0">推荐: </span>
                <el-switch v-model="scope.row.isRecommend" />
              </el-row>

            </template>
          </el-table-column>
          <el-table-column label="排序" prop="sortNum" align="center" width="75" :resizable="false" />
          <el-table-column label="SKU库存" prop="" align="center" width="100" :resizable="false">
            <el-button type="primary" icon="el-icon-edit" circle />
          </el-table-column>
          <el-table-column label="销量" prop="salesVolume" align="center" width="90" />
          <el-table-column label="操作" prop="" align="center" :resizable="false">
            <!-- <template slot-scope="scope"> -->
            <el-row style="margin: 10px 0">
              <el-button size="small">查看</el-button>
              <el-button size="small">编辑</el-button>
            </el-row>
            <el-row style="margin: 10px 0">
              <el-button size="small">数据</el-button>
              <el-button size="small" type="danger">删除</el-button>
            </el-row>
            <!-- </template> -->
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div class="footer">
      <el-row type="flex" justify="space-between" align="center">
        <el-col :span="3">
          <el-select v-model="batchOperation" size="small" placeholder="批量操作">
            <el-option
              v-for="item in batchOperationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="3" style="margin: 0 0 0 10px">
          <el-button type="primary" size="mini">确定</el-button>
        </el-col>
        <el-col :span="11" />
        <el-col :span="7">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page.sync="currentPage"
            :page-size.sync="sizePage"
            :pager-count="5"
            hide-on-single-page
            @current-change="handleCurrentChange"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getOneDictData } from '@/api/common'
import { getProductListData } from '@/api/product'

export default {
  name: 'ShopProduct',
  data() {
    return {
      searchForm: {
        name: '',
        id: '',
        type: '',
        brand: '',
        isNowInStock: '',
        isRecommend: ''
      },
      // 商品分类选择器的选项
      productTypeOptions: [
        { value: '1', label: '奶粉' }, { value: '2', label: '营养品' }
      ],
      productBrandOptions: [
        { value: '1', label: '艾儿' }, { value: '2', label: '蓝臻' }, { value: '3', label: '雀巢' }
      ],
      // 上架状态选择器的选项
      nowInStockOptions: [],
      // 推荐状态选择器的选项
      recommendOptions: [],
      // 商品列表数据
      productList: [],
      loading: false,
      // 批量操作选项
      batchOperationOptions: [{
        value: '1',
        label: '商品上架'
      }, {
        value: '2',
        label: '商品下架'
      }, {
        value: '3',
        label: '设为新品'
      }, {
        value: '4',
        label: '取消新品'
      }],
      batchOperation: '',
      // 分页相关
      currentPage: 1,
      sizePage: 10,
      total: 0,
      pageCount: 0
    }
  },
  async mounted() {
    // 这里用来向后端发送请求
    getOneDictData({ id: 1 }).then(res => {
      this.nowInStockOptions = res.data
    })
    getOneDictData({ id: 4 }).then(res => {
      this.recommendOptions = res.data
    })
    this.loading = true
    getProductListData({ currentPage: 1, sizePage: 10 }).then(res => {
      console.log(res)
      this.productList = res.data.records
      this.total = res.data.total
      this.loading = false
    })
  },

  methods: {
    /**
     * 重置筛选搜索表单
     */
    resetSearchForm() {
      this.searchForm = {
        name: '',
        id: '',
        type: '',
        brand: '',
        isNowInStock: '',
        isRecommend: ''
      }
      this.$refs['searchForm'].clearValidate()
    },
    /**
     * 筛选搜索查询数据
     */
    queryResults() {
      // 向后端发送请求查询数据
      this.loading = true
      this.currentPage = 1
      this.searchForm.currentPage = this.currentPage
      this.searchForm.sizePage = this.sizePage
      getProductListData(this.searchForm).then(res => {
        this.productList = res.data.records
        this.loading = false
        this.total = res.data.total
      })
    },
    handleCurrentChange(currentPage) {
      this.loading = true
      this.currentPage = currentPage
      this.searchForm.currentPage = this.currentPage
      this.searchForm.sizePage = this.sizePage
      getProductListData(this.searchForm).then(res => {
        this.productList = res.data.records
        this.loading = false
      })
      console.log(currentPage)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
}

.search-form {
  padding: 15px 0 0 40px;
}

.main-title {
  padding: 15px 0 0 0;
}

.main-product-list{
  padding: 15px 0 0 0;
}
.footer{
  padding:15px 0 0 0;
}
</style>
