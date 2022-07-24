<template>
  <div class="app-container">
    <div class="header">
      <el-card style="width: 100%">
        <el-row type="flex" justify="space-between">
          <el-col :span="2">
            <i class="el-icon-search" style="margin-right: 5px" />
            <span>筛选搜索</span>
          </el-col>
          <el-col :span="20" />
          <el-col :span="1" style="transform:translateX(-20px)">
            <el-button size="small" @click="resetSearchForm">重置</el-button>
          </el-col>
          <el-col :span="1" style="transform:translateX(-20px)">
            <el-button type="primary" size="small" @click="queryResults">查询结果</el-button>
          </el-col>
        </el-row>
        <div class="search-form">
          <el-form ref="searchForm" hide-required-asterisk :rules="searchFormRules" :inline="true" :model="searchForm">
            <el-row>
              <el-col :span="6">
                <el-form-item label="商品名称:" prop="name">
                  <el-input v-model="searchForm.name" clearable placeholder="请输入商品名称" size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="商品货号:" prop="id">
                  <el-input v-model="searchForm.id" clearable placeholder="请输入商品货号" size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="商品分类:" prop="type">
                  <el-select v-model="searchForm.type" clearable size="small" placeholder="请选择商品类型">
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
                <el-form-item label="商品品牌:" prop="brand">
                  <el-select v-model="searchForm.brand" clearable size="small" placeholder="请选择商品品牌">
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
                <el-form-item label="上架状态:" prop="isNowInStock">
                  <el-select v-model="searchForm.isNowInStock" size="small" placeholder="请选择上架状态">
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
                <el-form-item label="推荐状态:" prop="isRecommend">
                  <el-select v-model="searchForm.isRecommend" size="small" placeholder="请选择推荐状态">
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
    <div />
    <div />

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
        isRecommend: true
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
      recommendOptions: [
        { value: true, label: '推荐' }, { value: false, label: '暂不推荐' }
      ],
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
      }
    }
  },
  mounted() {
    getOneDictData({ id: 1 }).then(res => {
      this.nowInStockOptions = res.data
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
        isNowInStock: true,
        isRecommend: true
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
.app-container{
  padding: 20px;
}

.search-form{
  padding: 15px 0 0 40px
}

</style>
