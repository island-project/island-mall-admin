<template>
  <div class="app-container">
    <div class="header">
      <el-card style="width: 100%" shadow="hover">
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
            :rules="searchFormRules"
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
      <el-card shadow="hover">
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
      <el-card shadow="hover" :body-style="{padding: '0'}">
        <el-table :data="productList" border>
          <el-table-column
            type="selection"
          />
          <el-table-column label="编号" prop="id" align="center" width="75" :resizable="false" />
          <el-table-column label="商品图片" align="center" width="150" :resizable="false">
            <template slot-scope="scope">
              <el-image :src="scope.row.mainImage" fit="fill" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name" align="center" />
          <el-table-column label="价格/货号" align="center" />
          <el-table-column label="标签" prop="" align="center" />
          <el-table-column label="排序" prop="sortNum" align="center" width="75" :resizable="false" />
          <el-table-column label="SKU库存" prop="" align="center" width="100" :resizable="false">
            <el-button type="primary" icon="el-icon-edit" circle />
          </el-table-column>
          <el-table-column label="销量" prop="salesVolume" align="center" width="90" />
          <el-table-column label="操作" prop="" align="center" :resizable="false" />
        </el-table>
      </el-card>
    </div>

  </div>
</template>

<script>
import { getOneDictData } from '@/api/common'

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
      searchFormRules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '请输入商品货号', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择商品分类', trigger: 'change' }
        ],
        brand: [
          { required: true, message: '请选择商品品牌', trigger: 'change' }
        ]
      },
      productList: [{
        'id': 1,
        'name': '华为 HUAWEI P20',
        'type': 1,
        'brand': 1,
        'price': 3788,
        'artNo': 6946605,
        'isInStock': true,
        'isNew': false,
        'isRecommend': false,
        'sortNum': 1,
        'salesVolume': '12588678',
        'mainImage': 'https://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf58Ndefaac16.jpg'
      },
      {
        'id': 2,
        'name': '小米8 全面屏游戏智能手机 6GB+64GB 黑色 全网通4G 双卡双待',
        'type': 1,
        'brand': 2,
        'price': 2699,
        'artNo': 7437788,
        'isInStock': true,
        'isNew': true,
        'isRecommend': false,
        'sortNum': 2,
        'salesVolume': '643743',
        'mainImage': 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/xiaomi.jpg'
      },
      {
        'id': 3,
        'name': '小米 红米5A 全网通版 3GB+32GB 香槟金 移动联通电信4G手机 双卡双待',
        'type': 1,
        'brand': 2,
        'price': 649,
        'artNo': 7437789,
        'isInStock': true,
        'isNew': false,
        'isRecommend': true,
        'sortNum': 3,
        'salesVolume': '1237889',
        'mainImage': 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg'
      }]
    }
  },
  async mounted() {
    getOneDictData({ id: 1 }).then(res => {
      this.nowInStockOptions = res.data
    })
    getOneDictData({ id: 4 }).then(res => {
      this.recommendOptions = res.data
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
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          // 向后端发送请求查询数据
          console.log(this.searchForm)
        } else {
          return false
        }
      })
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
</style>
