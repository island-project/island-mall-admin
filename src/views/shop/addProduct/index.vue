<template>
  <div>
    <el-card class="card">
      <el-steps
        :space="200"
        :active="1"
        align-center
        finish-status="success"
      >
        <el-step title="已完成" />
        <el-step title="进行中" />
        <el-step title="步骤 3" />
        <el-step title="步骤 4" />
        <el-step title="步骤 5" />
      </el-steps>
      <div class="form">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-form-item label="产品分类">
              <el-select
                v-model="value"
                style="width: 790px"
                placeholder="请选择类型"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="商品名称">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="商品品牌">
              <el-select
                v-model="value"
                style="width: 790px"
                placeholder="请选择品牌"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="商品介绍">
              <el-input
                v-model="textarea1"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="商品货号">
              <el-input v-model="form.number" />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="商品售价">
              <el-input v-model="form.sellingPrice" />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="商品市场价">
              <el-input v-model="form.marketValue" />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="商品库存">
              <el-input v-model="form.inventory" />
            </el-form-item>
          </el-row>
          <el-row> <el-button type="primary">下一步，填写商品促销</el-button></el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        number: '',
        present: '',
        textarea1: '',
        sellingPrice: '',
        marketValue: '',
        inventory: ''

      },
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: ''
    }
  }
}
</script>

<style>
.form {
    padding: 30px 10px 0 8px;
}
.card {
    width: 1000px;
    height: 742px;
    padding: 17px 33px;
    margin: 0 auto;
    text-align: center;
}
</style>
