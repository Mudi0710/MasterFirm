<template>
  <q-page class='column'>
    <div id="myheader" class="row justify-end items-center" style="width: 100%;">
      <q-list class='text-h5 text-secondary mobile-none'>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-house' to='/' class="q-mx-xs">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            回前台
          </q-tooltip>
        </q-btn>
        <q-btn v-if='isLogin' round dense flat icon='fa-solid fa-right-from-bracket' @click='logout'
          class="q-ml-xl q-mr-lg">
          <q-tooltip transition-show='fade' transition-hide='fade' :offset='[0, 0]'>
            登出
          </q-tooltip>
        </q-btn>
      </q-list>
    </div>
    <div id='mycontent' class=''>
      <div class='row justify-between'>
        <div class='col-auto text-h3 text-secondary q-my-sm q-pl-md'>文章管理</div>
      </div>

      <!-- 文章管理區 -->
      <div class="q-pa-md">
        <!-- 本所簡介本所簡介本所簡介本所簡介本所簡介本所簡介本所簡介本所簡介本所簡介本所簡介本所簡介本所簡介本所簡介本所簡介本所簡介本所簡介 -->
        <div class="bg-accent text-h5 text-dark q-my-sm" style="height:1px;"></div>
        <div class="text-h5 text-accent q-my-sm" style="height:40px; line-height: 1.6em;">本所簡介</div>
        <q-table :grid="$q.screen.lt.xl" :columns="columnsIntroduction" :rows="introduction" row-key="title"
          separator="cell" square bordered wrap-cells binary-state-sort dense :filter="filter" :loading="loading"
          :pagination="paginationIntroduction" rows-per-page-label="每頁顯示筆數" no-data-label="目前沒有新增任何簡介文章"
          no-results-label="Oops...找不到該筆簡介文章" class="bg-transparent">

          <!-- 新增本所簡介按鈕 -->
          <template v-slot:top-left>
            <q-btn @click="openIntroductionDialog('', -1)" square flat :disable="introduction.length > 0"
              class='col-auto q-mr-xl bg-secondary text-dark text-body1 q-my-sm createBtn'>新增本所簡介</q-btn>
          </template>

          <!-- 簡介標題 -->
          <template #body-cell-title="title">
            <!-- <pre>{{ title.row.title }}</pre> -->
            <q-td :title="title" class="ellipsis" style="max-width: 150px;">
              {{ title.row.title }}
            </q-td>
          </template>

          <!-- 簡介內容 -->
          <template #body-cell-content="content">
            <!-- <pre>{{ content.row.content }}</pre> -->
            <q-td :content="content" class="ellipsis" style="max-width: 400px;">{{ content.row.content }}
            </q-td>
          </template>

          <!-- 編輯簡介 -->
          <template #body-cell-edit="edit">
            <q-td :edit="edit" style="max-width: 150px;">
              <!-- <pre>{{ edit }}</pre> -->
              <div class="row justify-center">
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='openIntroductionDialog(edit.row._id, edit.rowIndex)'
                  outline>
                  修改簡介</q-btn>
                <q-btn class="col-auto q-mx-sm q-my-xs"
                  @click='openDeleteIntroductionDialog(edit.row._id, edit.row.title)' outline>
                  刪除簡介</q-btn>
              </div>
            </q-td>
          </template>

          <!-- 表格底端分頁選項 -->
          <template v-slot:pagination="scope">
            <q-btn v-if="scope.pagesNumber > 1" icon="first_page" color="secondary" round dense flat
              :disable="scope.isFirstPage" @click="scope.firstPage" />

            <q-btn icon="chevron_left" color="secondary" round dense flat :disable="scope.isFirstPage"
              @click="scope.prevPage" />

            <q-btn icon="chevron_right" color="secondary" round dense flat :disable="scope.isLastPage"
              @click="scope.nextPage" />

            <q-btn v-if="scope.pagesNumber > 1" icon="last_page" color="secondary" round dense flat
              :disable="scope.isLastPage" @click="scope.lastPage" />
          </template>

          <!-- 找不到資料的訊息 -->
          <template v-slot:no-data="{ message }">
            <div class="full-width row flex-center text-accent q-gutter-sm">
              <span>
                {{ message }}
              </span>
            </div>
          </template>

          <!-- RWD 卡片 -->
          <template v-slot:item="card">
            <!-- <pre>{{ card }}</pre> -->
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm cursor-pointer ">
              <q-card square bordered class="bg-primary shadow" style="width: 100%;">
                <div v-for="col in card.cols" :key="col.name" class="q-pa-sm">
                  <!-- <pre>{{ col }}</pre> -->
                  <!-- 簡介標題、內容 -->
                  <div v-if="col.name !== 'edit'" class="row justify-between">
                    <span class="text-accent">{{ col.label }}：</span>
                    <span class="text-secondary ellipsis-3-lines" style="max-width: 300px;">{{ col.value }}</span>
                  </div>
                  <!-- 簡介編輯 -->
                  <div v-if="col.name === 'edit'" class="row justify-start">
                    <!-- <pre>{{ card.rowIndex }}</pre> -->

                    <div class="col-12 row justify-between">
                      <span class="text-accent">{{ col.label }}：</span>

                      <q-btn class="col-auto text-secondary" style="padding: 0px 8px;"
                        @click='openIntroductionDialog(card.row._id, card.rowIndex)' outline>修改簡介</q-btn>
                    </div>
                    <div class="col-12 row justify-end q-my-sm" style="height: 28.8px;">
                      <q-btn class="col-auto text-secondary" style="padding: 0px 8px;"
                        @click='openDeleteIntroductionDialog(card.row._id, card.row.title)' outline>刪除簡介</q-btn>
                    </div>
                  </div>
                </div>
              </q-card>
            </div>
          </template>

          <!-- loading 效果 -->
          <!-- QInnerLoading必须是其父元素内部的最后一个元素，以便它可以显示在其他内容的顶部。 -->
          <template v-slot:loading>
            <q-inner-loading showing dark transition-show="fade" color="primary" />
          </template>
        </q-table>

        <!-- 新增本所簡介文章時的彈出視窗 -->
        <q-dialog v-model="introductionForm.dialog" seamless>
          <q-card id="dialog" flat square bordered persistent v-if="introductionForm.dialog"
            class="bg-info text-secondary shadow-white">
            <q-form @submit.prevent='submitIntroductionForm' class="q-pa-md">
              <!-- 商品名稱 -->
              <p class="text-h6 text-dark">簡介標題</p>
              <q-input v-model="introductionForm.title" :rules='[rules.required]' type='text' outlined square dense />
              <!-- 商品描述 -->
              <p class="text-h6 text-dark">簡介內容</p>
              <q-editor model="qeditor" v-model="introductionForm.content" ref="editorRef" @paste="onPaste"
                :rules='[rules.required]' outlined square content-class="bg-dark" toolbar-bg="secondary"
                toolbar-text-color="dark" :dense="$q.screen.lt.lg" :toolbar="[
                  ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                  ['left', 'center', 'right', 'justify'],
                  ['token', 'hr', 'link', 'custom_btn'],
                  ['print', 'fullscreen'],
                  [
                    {
                      icon: $q.iconSet.editor.formatting,
                      fixedIcon: false,
                      list: 'no-icons',
                      options: [
                        'p',
                        'h1',
                        'h2',
                        'h3',
                        'h4',
                        'h5',
                        'h6',
                        'code'
                      ]
                    },
                    {
                      icon: $q.iconSet.editor.fontSize,
                      fixedIcon: false,
                      list: 'no-icons',
                      options: [
                        'size-1',
                        'size-2',
                        'size-3',
                        'size-4',
                        'size-5',
                        'size-6',
                        'size-7'
                      ]
                    },
                    {
                      icon: $q.iconSet.editor.font,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: [
                        'default_font',
                        'arial',
                        'arial_black',
                        'comic_sans',
                        'courier_new',
                        'impact',
                        'lucida_grande',
                        'times_new_roman',
                        'verdana'
                      ]
                    },
                    'removeFormat'
                  ],
                  ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
                  ['undo', 'redo'],
                  ['viewsource']
                ]" :fonts="{
  arial: 'Arial',
  arial_black: 'Arial Black',
  comic_sans: 'Comic Sans MS',
  courier_new: 'Courier New',
  impact: 'Impact',
  lucida_grande: 'Lucida Grande',
  times_new_roman: 'Times New Roman',
  verdana: 'Verdana'
}" />
              <!-- 簡介圖片 -->
              <p class="text-h6 text-dark">簡介圖片</p>
              <q-file v-model='introductionForm.image' multiple :rules='[rules.size]' accept='image/*' filled
                bottom-slots counter>
                <!-- 上傳icon -->
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" @click.stop.prevent />
                </template>
                <!-- 刪除icon -->
                <template v-slot:append>
                  <q-icon name="close" @click.stop.prevent="model = null" class="cursor-pointer" />
                </template>
                <template v-slot:hint>
                </template>
              </q-file>
              <div class="row justify-around">
                <!-- 確定新增 -->
                <q-btn square flat type='submit' class="col-4 bg-secondary text-dark q-my-sm" label="送出編輯" />
                <!-- 取消新增 -->
                <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
                  @click='introductionForm.dialog = false' />
              </div>
            </q-form>
          </q-card>
        </q-dialog>

        <!-- 刪除本所簡介文章時的彈出視窗 -->
        <q-dialog v-model="deleteIntroductionDialog.dialog" seamless persistent>
          <q-card square class="row justify-center bg-info q-pa-lg">
            <div class="col-12 text-center text-h3 text-red q-pb-md">警告</div>
            <div class="col-12 text-center text-h6 text-dark q-pb-md">你確定要刪除<br>【{{ delIntroduction.title }}】嗎？<br>刪除將無法復原！</div>
            <div class="col-12 row justify-around">
              <!-- 確定刪除 -->
              <q-btn @click="deleteIntroduction(delIntroduction._id)" square flat
                class="col-4 bg-secondary text-dark q-my-sm" label="刪除" />
              <!-- 取消刪除 -->
              <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
                @click='deleteIntroductionDialog.dialog = false' />
            </div>
          </q-card>
        </q-dialog>

        <!-- 最新消息最新消息最新消息最新消息最新消息最新消息最新消息最新消息最新消息最新消息最新消息最新消息最新消息最新消息最新消息最新消息 -->
        <div class="bg-accent text-h5 text-dark q-mt-xl q-mb-sm" style="height:1px;"></div>
        <div class="text-h5 text-accent q-my-sm" style="height:40px; line-height: 1.6em;">最新消息</div>
        <q-table :grid="$q.screen.lt.xl" :columns="columnsNewses" :rows="newses" row-key="date" separator="cell" square
          bordered wrap-cells dense :filter="filter" :loading="loading" :pagination="paginationNews"
          rows-per-page-label="每頁顯示筆數" no-data-label="目前沒有新增任何最新消息" no-results-label="Oops...找不到該筆最新消息"
          class="bg-transparent">

          <!-- 新增最新消息按鈕 -->
          <template v-slot:top-left>
            <q-btn @click="openNewsesDialog('', -1)" square flat
              class='col-auto q-mr-xl bg-secondary text-dark text-body1 q-my-sm createBtn'>新增最新消息</q-btn>
          </template>

          <!-- 消息搜尋 -->
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="&nbsp;Search" class="search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <!-- 發布日期 -->
          <template #body-cell-date="date">
            <!-- <pre>{{ date.row.date }}</pre> -->
            <q-td :date="date" class="text-center" style="min-width: 50px;max-width: 120px;">{{ new
                Date(date.row.date).toLocaleString()
            }}
            </q-td>

          </template>
          <!-- 消息標題 -->
          <template #body-cell-title="title">
            <!-- <pre>{{ title.row.title }}</pre> -->
            <q-td :title="title" class="ellipsis" style="max-width: 150px;">
              {{ title.row.title }}
            </q-td>
          </template>

          <!-- 編輯消息 -->
          <template #body-cell-edit="edit">
            <q-td :edit="edit" style="min-width: 100px;max-width: 150px;">
              <!-- <pre>{{ edit }}</pre> -->
              <div class="row justify-center">
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='openNewsesDialog(edit.row._id, edit.rowIndex)' outline>
                  修改消息</q-btn>
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='openDeleteNewsDialog(edit.row._id, edit.row.title)'
                  outline>
                  刪除消息</q-btn>
              </div>
            </q-td>
          </template>

          <!-- 表格底端分頁選項 -->
          <template v-slot:pagination="scope">
            <q-btn v-if="scope.pagesNumber > 1" icon="first_page" color="secondary" round dense flat
              :disable="scope.isFirstPage" @click="scope.firstPage" />

            <q-btn icon="chevron_left" color="secondary" round dense flat :disable="scope.isFirstPage"
              @click="scope.prevPage" />

            <q-btn icon="chevron_right" color="secondary" round dense flat :disable="scope.isLastPage"
              @click="scope.nextPage" />

            <q-btn v-if="scope.pagesNumber > 1" icon="last_page" color="secondary" round dense flat
              :disable="scope.isLastPage" @click="scope.lastPage" />
          </template>

          <!-- 找不到資料的訊息 -->
          <template v-slot:no-data="{ message }">
            <div class="full-width row flex-center text-accent q-gutter-sm">
              <span>
                {{ message }}
              </span>
            </div>
          </template>

          <!-- RWD 卡片 -->
          <template v-slot:item="card">
            <!-- <pre>{{ card }}</pre> -->
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm cursor-pointer ">
              <q-card square bordered class="bg-primary shadow" style="width: 100%;height: 100%;">
                <div v-for="col in card.cols" :key="col.name" class="q-pa-sm">
                  <!-- <pre>{{ col }}</pre> -->
                  <!-- 發布日期 -->
                  <div v-if="col.name === 'date'" class="row justify-between">
                    <span class="col-auto text-accent">{{ col.label }}：</span>
                    <span class="col-auto text-secondary text-right text-wrap q-ml-auto">{{ new
                        Date(col.value).toLocaleString()
                    }}</span>
                  </div>
                  <!-- 消息標題、上架狀態 -->
                  <div v-if="col.name !== 'date' && col.name !== 'edit'" class="row justify-between">
                    <span class="col-auto text-accent">{{ col.label }}：</span>
                    <span class="col-auto text-secondary text-right text-wrap q-ml-auto">{{
                        col.value
                    }}</span>
                  </div>
                  <!-- 消息編輯 -->
                  <div v-if="col.name === 'edit'" class="row justify-start">
                    <!-- <pre>{{ card.rowIndex }}</pre> -->

                    <div class="col-12 row justify-between">
                      <span class="text-accent">{{ col.label }}：</span>

                      <q-btn class="col-auto text-secondary" style="padding: 0px 8px;"
                        @click='openNewsesDialog(card.row._id, card.rowIndex)' outline>修改消息</q-btn>
                    </div>
                    <div class="col-12 row justify-end q-my-sm" style="height: 28.8px;">
                      <q-btn class="col-auto text-secondary" style="padding: 0px 8px;"
                        @click='openDeleteNewsDialog(card.row._id, card.row.title)' outline>刪除消息</q-btn>
                    </div>
                  </div>
                </div>
              </q-card>
            </div>
          </template>

          <!-- loading 效果 -->
          <!-- QInnerLoading必须是其父元素内部的最后一个元素，以便它可以显示在其他内容的顶部。 -->
          <template v-slot:loading>
            <q-inner-loading showing dark transition-show="fade" color="primary" />
          </template>
        </q-table>

        <!-- 新增最新消息時的彈出視窗 -->
        <q-dialog v-model="newsForm.dialog" seamless>
          <q-card id="dialog" flat square bordered persistent v-if="newsForm.dialog"
            class="bg-info text-secondary shadow-white">
            <q-form @submit.prevent='submitnewsForm' class="q-pa-md">
              <!-- 消息標題 -->
              <p class="text-h6 text-dark">消息標題</p>
              <q-input v-model="newsForm.title" :rules='[rules.required]' type='text' outlined square dense />
              <!-- 發布狀態 -->
              <p class="text-h6 text-dark">發布狀態</p>
              <q-toggle class="col-6 text-dark" v-model="newsForm.show" :label="newsForm.show ? '已發布' : '未發布'" />
              <!-- 消息內容 -->
              <p class="text-h6 text-dark">消息內容</p>
              <q-editor model="qeditor" v-model="newsForm.content" ref="editorRef" @paste="onPaste"
                :rules='[rules.required]' outlined square content-class="bg-dark" toolbar-bg="secondary"
                toolbar-text-color="dark" :dense="$q.screen.lt.lg" :toolbar="[
                  ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                  ['left', 'center', 'right', 'justify'],
                  ['token', 'hr', 'link', 'custom_btn'],
                  ['print', 'fullscreen'],
                  [
                    {
                      icon: $q.iconSet.editor.formatting,
                      fixedIcon: false,
                      list: 'no-icons',
                      options: [
                        'p',
                        'h1',
                        'h2',
                        'h3',
                        'h4',
                        'h5',
                        'h6',
                        'code'
                      ]
                    },
                    {
                      icon: $q.iconSet.editor.fontSize,
                      fixedIcon: false,
                      list: 'no-icons',
                      options: [
                        'size-1',
                        'size-2',
                        'size-3',
                        'size-4',
                        'size-5',
                        'size-6',
                        'size-7'
                      ]
                    },
                    {
                      icon: $q.iconSet.editor.font,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: [
                        'default_font',
                        'arial',
                        'arial_black',
                        'comic_sans',
                        'courier_new',
                        'impact',
                        'lucida_grande',
                        'times_new_roman',
                        'verdana'
                      ]
                    },
                    'removeFormat'
                  ],
                  ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
                  ['undo', 'redo'],
                  ['viewsource']
                ]" :fonts="{
  arial: 'Arial',
  arial_black: 'Arial Black',
  comic_sans: 'Comic Sans MS',
  courier_new: 'Courier New',
  impact: 'Impact',
  lucida_grande: 'Lucida Grande',
  times_new_roman: 'Times New Roman',
  verdana: 'Verdana'
}" />

              <div class="row justify-around">
                <!-- 確定新增 -->
                <q-btn square flat type='submit' class="col-4 bg-secondary text-dark q-my-sm" label="送出編輯" />
                <!-- 取消新增 -->
                <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
                  @click='newsForm.dialog = false' />
              </div>
            </q-form>
          </q-card>
        </q-dialog>

        <!-- 刪除最新消息文章時的彈出視窗 -->
        <q-dialog v-model="deleteNewsDialog.dialog" seamless persistent>
          <q-card square class="row justify-center bg-info q-pa-lg">
            <div class="col-12 text-center text-h3 text-red q-pb-md">警告</div>
            <div class="col-12 text-center text-h6 text-dark q-pb-md">你確定要刪除<br>【{{ delnews.title }}】嗎？<br>刪除將無法復原！</div>
            <div class="col-12 row justify-around">
              <!-- 確定刪除 -->
              <q-btn @click="deleteNews(delnews._id)" square flat class="col-4 bg-secondary text-dark q-my-sm"
                label="刪除" />
              <!-- 取消刪除 -->
              <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
                @click='deleteNewsDialog.dialog = false' />
            </div>
          </q-card>
        </q-dialog>

        <!-- 靈學知識靈學知識靈學知識靈學知識靈學知識靈學知識靈學知識靈學知識靈學知識靈學知識靈學知識靈學知識靈學知識靈學知識靈學知識靈學知識 -->
        <div class="bg-accent text-h5 text-dark q-mt-xl q-mb-sm" style="height:1px;"></div>
        <div class="text-h5 text-accent q-my-sm" style="height:40px; line-height: 1.6em;">靈學知識</div>
        <q-table :grid="$q.screen.lt.xl" :columns="columnsKnowledges" :rows="knowledges" row-key="date" separator="cell"
          square bordered wrap-cells dense :filter="filter" :loading="loading" :pagination="paginationKnowledges"
          rows-per-page-label="每頁顯示筆數" no-data-label="目前沒有新增任何靈學知識" no-results-label="Oops...找不到該筆靈學知識"
          class="bg-transparent">

          <!-- 新增靈學知識按鈕 -->
          <template v-slot:top-left>
            <q-btn @click="openKnowledgesDialog('', -1)" square flat
              class='col-auto q-mr-xl bg-secondary text-dark text-body1 q-my-sm createBtn'>新增靈學知識</q-btn>
          </template>

          <!-- 靈學知識搜尋 -->
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="&nbsp;Search" class="search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <!-- 發布日期 -->
          <template #body-cell-date="date">
            <!-- <pre>{{ date.row.date }}</pre> -->
            <q-td :date="date" class="text-center" style="min-width: 50px;max-width: 120px;">{{ new
                Date(date.row.date).toLocaleString()
            }}
            </q-td>

          </template>
          <!-- 靈學知識標題 -->
          <template #body-cell-title="title">
            <!-- <pre>{{ title.row.title }}</pre> -->
            <q-td :title="title" class="ellipsis" style="max-width: 150px;">
              {{ title.row.title }}
            </q-td>
          </template>

          <!-- 編輯靈學知識 -->
          <template #body-cell-edit="edit">
            <q-td :edit="edit" style="min-width: 100px;max-width: 150px;">
              <!-- <pre>{{ edit }}</pre> -->
              <div class="row justify-center">
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='openKnowledgesDialog(edit.row._id, edit.rowIndex)'
                  outline>
                  修改文章</q-btn>
                <q-btn class="col-auto q-mx-sm q-my-xs"
                  @click='openDeleteKnowledgesDialog(edit.row._id, edit.row.title)' outline>
                  刪除文章</q-btn>
              </div>
            </q-td>
          </template>

          <!-- 表格底端分頁選項 -->
          <template v-slot:pagination="scope">
            <q-btn v-if="scope.pagesNumber > 1" icon="first_page" color="secondary" round dense flat
              :disable="scope.isFirstPage" @click="scope.firstPage" />

            <q-btn icon="chevron_left" color="secondary" round dense flat :disable="scope.isFirstPage"
              @click="scope.prevPage" />

            <q-btn icon="chevron_right" color="secondary" round dense flat :disable="scope.isLastPage"
              @click="scope.nextPage" />

            <q-btn v-if="scope.pagesNumber > 1" icon="last_page" color="secondary" round dense flat
              :disable="scope.isLastPage" @click="scope.lastPage" />
          </template>

          <!-- 找不到資料的訊息 -->
          <template v-slot:no-data="{ message }">
            <div class="full-width row flex-center text-accent q-gutter-sm">
              <span>
                {{ message }}
              </span>
            </div>
          </template>

          <!-- RWD 卡片 -->
          <template v-slot:item="card">
            <!-- <pre>{{ card }}</pre> -->
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm cursor-pointer ">
              <q-card square bordered class="bg-primary shadow" style="width: 100%;height: 100%;">
                <div v-for="col in card.cols" :key="col.name" class="q-pa-sm">
                  <!-- <pre>{{ col }}</pre> -->
                  <!-- 發布日期 -->
                  <div v-if="col.name === 'date'" class="row justify-between">
                    <span class="col-auto text-accent">{{ col.label }}：</span>
                    <span class="col-auto text-secondary text-right text-wrap q-ml-auto">{{ new
                        Date(col.value).toLocaleString()
                    }}</span>
                  </div>
                  <!-- 消息標題、上架狀態 -->
                  <div v-if="col.name !== 'date' && col.name !== 'edit'" class="row justify-between">
                    <span class="col-auto text-accent">{{ col.label }}：</span>
                    <span class="col-auto text-secondary text-right text-wrap q-ml-auto">{{
                        col.value
                    }}</span>
                  </div>
                  <!-- 消息編輯 -->
                  <div v-if="col.name === 'edit'" class="row justify-start">
                    <!-- <pre>{{ card.rowIndex }}</pre> -->

                    <div class="col-12 row justify-between">
                      <span class="text-accent">{{ col.label }}：</span>

                      <q-btn class="col-auto text-secondary" style="padding: 0px 8px;"
                        @click='openKnowledgesDialog(card.row._id, card.rowIndex)' outline>修改文章</q-btn>
                    </div>
                    <div class="col-12 row justify-end q-my-sm" style="height: 28.8px;">
                      <q-btn class="col-auto text-secondary" style="padding: 0px 8px;"
                        @click='openDeleteKnowledgesDialog(card.row._id, card.row.title)' outline>刪除文章</q-btn>
                    </div>
                  </div>
                </div>
              </q-card>
            </div>
          </template>

          <!-- loading 效果 -->
          <!-- QInnerLoading必须是其父元素内部的最后一个元素，以便它可以显示在其他内容的顶部。 -->
          <template v-slot:loading>
            <q-inner-loading showing dark transition-show="fade" color="primary" />
          </template>
        </q-table>

        <!-- 新增靈學知識時的彈出視窗 -->
        <q-dialog v-model="knowledgesForm.dialog" seamless>
          <q-card id="dialog" flat square bordered persistent v-if="knowledgesForm.dialog"
            class="bg-info text-secondary shadow-white">
            <q-form @submit.prevent='submitKnowledgesForm' class="q-pa-md">
              <!-- 靈學知識標題 -->
              <p class="text-h6 text-dark">文章標題</p>
              <q-input v-model="knowledgesForm.title" :rules='[rules.required]' type='text' outlined square dense />
              <!-- 發布狀態 -->
              <p class="text-h6 text-dark">發布狀態</p>
              <q-toggle class="col-6 text-dark" v-model="knowledgesForm.show"
                :label="knowledgesForm.show ? '已發布' : '未發布'" />
              <!-- 文章圖片 -->
              <!-- <p class="text-h6 text-dark">文章圖片</p>
              <q-file v-model='knowledgesForm.image' multiple :rules='[rules.size]' accept='image/*' filled bottom-slots
                counter>
                上傳icon
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" @click.stop.prevent />
                </template>
                刪除icon
                <template v-slot:append>
                  <q-icon name="close" @click.stop.prevent="model = null" class="cursor-pointer" />
                </template>
                <template v-slot:hint>
                </template>
              </q-file> -->
              <!-- 消息內容 -->
              <p class="text-h6 text-dark">文章內容</p>
              <q-editor model="qeditor" v-model="knowledgesForm.content" ref="editorRef" @paste="onPaste"
                :rules='[rules.required]' outlined square content-class="bg-dark" toolbar-bg="secondary"
                toolbar-text-color="dark" :dense="$q.screen.lt.lg" :toolbar="[
                  ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                  ['left', 'center', 'right', 'justify'],
                  ['token', 'hr', 'link', 'custom_btn'],
                  ['print', 'fullscreen'],
                  [
                    {
                      icon: $q.iconSet.editor.formatting,
                      fixedIcon: false,
                      list: 'no-icons',
                      options: [
                        'p',
                        'h1',
                        'h2',
                        'h3',
                        'h4',
                        'h5',
                        'h6',
                        'code'
                      ]
                    },
                    {
                      icon: $q.iconSet.editor.fontSize,
                      fixedIcon: false,
                      list: 'no-icons',
                      options: [
                        'size-1',
                        'size-2',
                        'size-3',
                        'size-4',
                        'size-5',
                        'size-6',
                        'size-7'
                      ]
                    },
                    {
                      icon: $q.iconSet.editor.font,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: [
                        'default_font',
                        'arial',
                        'arial_black',
                        'comic_sans',
                        'courier_new',
                        'impact',
                        'lucida_grande',
                        'times_new_roman',
                        'verdana'
                      ]
                    },
                    'removeFormat'
                  ],
                  ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
                  ['undo', 'redo'],
                  ['viewsource']
                ]" :fonts="{
  arial: 'Arial',
  arial_black: 'Arial Black',
  comic_sans: 'Comic Sans MS',
  courier_new: 'Courier New',
  impact: 'Impact',
  lucida_grande: 'Lucida Grande',
  times_new_roman: 'Times New Roman',
  verdana: 'Verdana'
}" />

              <div class="row justify-around">
                <!-- 確定新增 -->
                <q-btn square flat type='submit' class="col-4 bg-secondary text-dark q-my-sm" label="送出編輯" />
                <!-- 取消新增 -->
                <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
                  @click='knowledgesForm.dialog = false' />
              </div>
            </q-form>
          </q-card>
        </q-dialog>

        <!-- 刪除靈學知識文章時的彈出視窗 -->
        <q-dialog v-model="deleteKnowledgesDialog.dialog" seamless persistent>
          <q-card square class="row justify-center bg-info q-pa-lg">
            <div class="col-12 text-center text-h3 text-red q-pb-md">警告</div>
            <div class="col-12 text-center text-h6 text-dark q-pb-md">你確定要刪除<br>【{{ delknowledges.title }}】嗎？<br>刪除將無法復原！</div>
            <div class="col-12 row justify-around">
              <!-- 確定刪除 -->
              <q-btn @click="deleteKnowledges(delknowledges._id)" square flat
                class="col-4 bg-secondary text-dark q-my-sm" label="刪除" />
              <!-- 取消刪除 -->
              <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
                @click='deleteKnowledgesDialog.dialog = false' />
            </div>
          </q-card>
        </q-dialog>

        <!-- 案例分享案例分享案例分享案例分享案例分享案例分享案例分享案例分享案例分享案例分享案例分享案例分享案例分享案例分享案例分享案例分享 -->
        <div class="bg-accent text-h5 text-dark q-mt-xl q-mb-sm" style="height:1px;"></div>
        <div class="text-h5 text-accent q-my-sm" style="height:40px; line-height: 1.6em;">案例分享</div>
        <q-table :grid="$q.screen.lt.xl" :columns="columnsCases" :rows="cases" row-key="date" separator="cell" square
          bordered wrap-cells dense :filter="filter" :loading="loading" :pagination="paginationCases"
          rows-per-page-label="每頁顯示筆數" no-data-label="目前沒有新增任何案例分享" no-results-label="Oops...找不到該筆案例分享"
          class="bg-transparent">

          <!-- 新增案例分享按鈕 -->
          <template v-slot:top-left>
            <q-btn @click="opencasesDialog('', -1)" square flat
              class='col-auto q-mr-xl bg-secondary text-dark text-body1 q-my-sm createBtn'>新增案例分享</q-btn>
          </template>

          <!-- 案例分享搜尋 -->
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="&nbsp;Search" class="search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <!-- 發布日期 -->
          <template #body-cell-date="date">
            <!-- <pre>{{ date.row.date }}</pre> -->
            <q-td :date="date" class="text-center" style="min-width: 50px;max-width: 120px;">{{ new
                Date(date.row.date).toLocaleString()
            }}
            </q-td>

          </template>
          <!-- 案例分享標題 -->
          <template #body-cell-title="title">
            <!-- <pre>{{ title.row.title }}</pre> -->
            <q-td :title="title" class="ellipsis" style="max-width: 150px;">
              {{ title.row.title }}
            </q-td>
          </template>

          <!-- 編輯案例分享 -->
          <template #body-cell-edit="edit">
            <q-td :edit="edit" style="min-width: 100px;max-width: 150px;">
              <!-- <pre>{{ edit }}</pre> -->
              <div class="row justify-center">
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='opencasesDialog(edit.row._id, edit.rowIndex)' outline>
                  修改文章</q-btn>
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='openDeleteCasesDialog(edit.row._id, edit.row.title)'
                  outline>
                  刪除文章</q-btn>
              </div>
            </q-td>
          </template>

          <!-- 表格底端分頁選項 -->
          <template v-slot:pagination="scope">
            <q-btn v-if="scope.pagesNumber > 1" icon="first_page" color="secondary" round dense flat
              :disable="scope.isFirstPage" @click="scope.firstPage" />

            <q-btn icon="chevron_left" color="secondary" round dense flat :disable="scope.isFirstPage"
              @click="scope.prevPage" />

            <q-btn icon="chevron_right" color="secondary" round dense flat :disable="scope.isLastPage"
              @click="scope.nextPage" />

            <q-btn v-if="scope.pagesNumber > 1" icon="last_page" color="secondary" round dense flat
              :disable="scope.isLastPage" @click="scope.lastPage" />
          </template>

          <!-- 找不到資料的訊息 -->
          <template v-slot:no-data="{ message }">
            <div class="full-width row flex-center text-accent q-gutter-sm">
              <span>
                {{ message }}
              </span>
            </div>
          </template>

          <!-- RWD 卡片 -->
          <template v-slot:item="card">
            <!-- <pre>{{ card }}</pre> -->
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm cursor-pointer ">
              <q-card square bordered class="bg-primary shadow" style="width: 100%;height: 100%;">
                <div v-for="col in card.cols" :key="col.name" class="q-pa-sm">
                  <!-- <pre>{{ col }}</pre> -->
                  <!-- 發布日期 -->
                  <div v-if="col.name === 'date'" class="row justify-between">
                    <span class="col-auto text-accent">{{ col.label }}：</span>
                    <span class="col-auto text-secondary text-right text-wrap q-ml-auto">{{ new
                        Date(col.value).toLocaleString()
                    }}</span>
                  </div>
                  <!-- 消息標題、上架狀態 -->
                  <div v-if="col.name !== 'date' && col.name !== 'edit'" class="row justify-between">
                    <span class="col-auto text-accent">{{ col.label }}：</span>
                    <span class="col-auto text-secondary text-right text-wrap q-ml-auto">{{ col.value }}</span>
                  </div>
                  <!-- 消息編輯 -->
                  <div v-if="col.name === 'edit'" class="row justify-start">
                    <!-- <pre>{{ card.rowIndex }}</pre> -->

                    <div class="col-12 row justify-between">
                      <span class="text-accent">{{ col.label }}：</span>

                      <q-btn class="col-auto text-secondary" style=" padding: 0px 8px;"
                        @click='opencasesDialog(card.row._id, card.rowIndex)' outline>修改文章</q-btn>
                    </div>
                    <div class="col-12 row justify-end q-my-sm" style="height: 28.8px;">
                      <q-btn class="col-auto text-secondary" style=" padding: 0px 8px;"
                        @click='openDeleteCasesDialog(card.row._id, card.row.title)' outline>刪除文章</q-btn>
                    </div>
                  </div>
                </div>
              </q-card>
            </div>
          </template>

          <!-- loading 效果 -->
          <!-- QInnerLoading必须是其父元素内部的最后一个元素，以便它可以显示在其他内容的顶部。 -->
          <template v-slot:loading>
            <q-inner-loading showing dark transition-show="fade" color="primary" />
          </template>
        </q-table>

        <!-- 新增案例分享時的彈出視窗 -->
        <q-dialog v-model="casesForm.dialog" seamless>
          <q-card id="dialog" flat square bordered persistent v-if="casesForm.dialog"
            class="bg-info text-secondary shadow-white">
            <q-form @submit.prevent='submitCasesForm' class="q-pa-md">
              <!-- 案例分享標題 -->
              <p class="text-h6 text-dark">文章標題</p>
              <q-input v-model="casesForm.title" :rules='[rules.required]' type='text' outlined square dense />
              <!-- 發布狀態 -->
              <p class="text-h6 text-dark">發布狀態</p>
              <q-toggle class="col-6 text-dark" v-model="casesForm.show" :label="casesForm.show ? '已發布' : '未發布'" />
              <!-- 文章圖片 -->
              <!-- <p class="text-h6 text-dark">文章圖片</p>
              <q-file v-model='casesForm.image' multiple :rules='[rules.size]' accept='image/*' filled bottom-slots
                counter>
                上傳icon
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" @click.stop.prevent />
                </template>
                刪除icon
                <template v-slot:append>
                  <q-icon name="close" @click.stop.prevent="model = null" class="cursor-pointer" />
                </template>
                <template v-slot:hint>
                </template>
              </q-file> -->
              <!-- 消息內容 -->
              <p class="text-h6 text-dark">文章內容</p>
              <q-editor model="qeditor" v-model="casesForm.content" ref="editorRef" @paste="onPaste"
                :rules='[rules.required]' outlined square content-class="bg-dark" toolbar-bg="secondary"
                toolbar-text-color="dark" :dense="$q.screen.lt.lg" :toolbar="[
                  ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                  ['left', 'center', 'right', 'justify'],
                  ['token', 'hr', 'link', 'custom_btn'],
                  ['print', 'fullscreen'],
                  [
                    {
                      icon: $q.iconSet.editor.formatting,
                      fixedIcon: false,
                      list: 'no-icons',
                      options: [
                        'p',
                        'h1',
                        'h2',
                        'h3',
                        'h4',
                        'h5',
                        'h6',
                        'code'
                      ]
                    },
                    {
                      icon: $q.iconSet.editor.fontSize,
                      fixedIcon: false,
                      list: 'no-icons',
                      options: [
                        'size-1',
                        'size-2',
                        'size-3',
                        'size-4',
                        'size-5',
                        'size-6',
                        'size-7'
                      ]
                    },
                    {
                      icon: $q.iconSet.editor.font,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: [
                        'default_font',
                        'arial',
                        'arial_black',
                        'comic_sans',
                        'courier_new',
                        'impact',
                        'lucida_grande',
                        'times_new_roman',
                        'verdana'
                      ]
                    },
                    'removeFormat'
                  ],
                  ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
                  ['undo', 'redo'],
                  ['viewsource']
                ]" :fonts="{
  arial: 'Arial',
  arial_black: 'Arial Black',
  comic_sans: 'Comic Sans MS',
  courier_new: 'Courier New',
  impact: 'Impact',
  lucida_grande: 'Lucida Grande',
  times_new_roman: 'Times New Roman',
  verdana: 'Verdana'
}" />

              <div class="row justify-around">
                <!-- 確定新增 -->
                <q-btn square flat type='submit' class="col-4 bg-secondary text-dark q-my-sm" label="送出編輯" />
                <!-- 取消新增 -->
                <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
                  @click='casesForm.dialog = false' />
              </div>
            </q-form>
          </q-card>
        </q-dialog>

        <!-- 刪除案例分享文章時的彈出視窗 -->
        <q-dialog v-model="deleteCasesDialog.dialog" seamless persistent>
          <q-card square class="row justify-center bg-info q-pa-lg">
            <div class="col-12 text-center text-h3 text-red q-pb-md">警告</div>
            <div class="col-12 text-center text-h6 text-dark q-pb-md">你確定要刪除<br>【{{ delCases.title }}】嗎？<br>刪除將無法復原！</div>
            <div class="col-12 row justify-around">
              <!-- 確定刪除 -->
              <q-btn @click="deleteCases(delCases._id)" square flat class="col-4 bg-secondary text-dark q-my-sm"
                label="刪除" />
              <!-- 取消刪除 -->
              <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
                @click='deleteCasesDialog.dialog = false' />
            </div>
          </q-card>
        </q-dialog>

      </div>
    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { apiAuth } from '@/boot/axios'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useQuasar } from 'quasar'
import Swal from 'sweetalert2'

const user = useUserStore()
const { logout } = user
const { isLogin } = storeToRefs(user)

const filter = ref('')
const $q = useQuasar()
const loading = ref(false)

// 簡介文章陣列
const introduction = reactive([])
// 最新消息陣列
const newses = reactive([])
// 靈學知識陣列
const knowledges = reactive([])
// 案例分享陣列
const cases = reactive([])

// 簡介分頁
const paginationIntroduction = reactive({
  items: [], // table要顯示的資料
  page: 1, // 目前第幾頁
  rowsPerPage: 0 // 每頁幾筆，0 代表 All
})
// 最新消息分頁
const paginationNews = reactive({
  items: [], // table要顯示的資料
  page: 1, // 目前第幾頁
  rowsPerPage: 10 // 每頁幾筆，0 代表 All
})
// 靈學知識分頁
const paginationKnowledges = reactive({
  items: [], // table要顯示的資料
  page: 1, // 目前第幾頁
  rowsPerPage: 10 // 每頁幾筆，0 代表 All
})
// 案例分享分頁
const paginationCases = reactive({
  items: [], // table要顯示的資料
  page: 1, // 目前第幾頁
  rowsPerPage: 10 // 每頁幾筆，0 代表 All
})

// 簡介表單預設格式
const introductionForm = reactive({
  _id: '',
  title: '',
  content: '',
  image: [],
  idx: -1,
  dialog: false
})
// 最新消息表單預設格式
const newsForm = reactive({
  _id: '',
  title: '',
  content: '',
  show: false,
  idx: -1,
  dialog: false
})
// 靈學知識表單預設格式
const knowledgesForm = reactive({
  _id: '',
  title: '',
  content: '',
  show: false,
  image: [],
  idx: -1,
  dialog: false
})
// 案例分享表單預設格式
const casesForm = reactive({
  _id: '',
  title: '',
  content: '',
  show: false,
  image: [],
  idx: -1,
  dialog: false
})

// 編輯器
const editorRef = ref(null)
const onPaste = (evt) => {
  // Let inputs do their thing, so we don't break pasting of links.
  if (evt.target.nodeName === 'INPUT') return
  let text, onPasteStripFormattingIEPaste
  evt.preventDefault()
  evt.stopPropagation()
  if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
    text = evt.originalEvent.clipboardData.getData('text/plain')
    editorRef.value.runCmd('insertText', text)
  } else if (evt.clipboardData && evt.clipboardData.getData) {
    text = evt.clipboardData.getData('text/plain')
    editorRef.value.runCmd('insertText', text)
  } else if (window.clipboardData && window.clipboardData.getData) {
    if (!onPasteStripFormattingIEPaste) {
      onPasteStripFormattingIEPaste = true
      editorRef.value.runCmd('ms-pasteTextOnly', text)
    }
    onPasteStripFormattingIEPaste = false
  }
}

// 驗證規則
const rules = reactive({
  required(v) {
    return !!v || '必填欄位'
  },
  size(v) {
    return !v || !v.length || (v[0]?.type?.includes('image') && v[0]?.size <= 1024 * 1024 * 2) || '檔案格式不符（須為圖片檔，且檔案大小 2 MB 以下）'
  }
})

// 簡介送出表單
const submitIntroductionForm = async () => {
  // 表單送出時，因為後端要收到的是 FormData 的資料型態，所以要建立一個 FormData 物件
  const fd = new FormData()
  // 要把東西放進去 FormData 要使用 .append(key, value)，例如：fd.append('name', form.name)
  // 可以一行一行寫，也可以一個 for 迴圈搞定
  for (const key in introductionForm) {
    if (['_id', 'idx', 'dialog'].includes(key)) continue
    else if (key === 'image') {
      for (const image of introductionForm.image) {
        fd.append(key, image)
      }
    } else {
      fd.append(key, introductionForm[key])
    }
  }
  try {
    if (introductionForm._id.length === 0) {
      const { data } = await apiAuth.post('/introduction', fd)
      introduction.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '新增成功',
        text: '您已成功新增一筆本所簡介！'
      })
      initIntroduction()
    } else {
      const { data } = await apiAuth.patch('/introduction/' + introductionForm._id, fd)
      introduction[introductionForm.idx] = data.result
      Swal.fire({
        icon: 'success',
        title: '修改成功',
        text: '您已成功修改該筆本所簡介！'
      })
      initIntroduction()
    }
    introductionForm.dialog = false
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '新增失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
// 最新消息送出表單
const submitnewsForm = async () => {
  try {
    if (newsForm._id.length === 0) {
      const { data } = await apiAuth.post('/newses', newsForm)
      newses.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '新增成功',
        text: '您已成功新增一筆最新消息！'
      })
      initNewses()
    } else {
      const { data } = await apiAuth.patch('/newses/' + newsForm._id, newsForm)
      newses[newsForm.idx] = data.result
      Swal.fire({
        icon: 'success',
        title: '修改成功',
        text: '您已成功修改該筆最新消息！'
      })
      initNewses()
    }
    newsForm.dialog = false
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '新增失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}// 靈學知識送出表單
const submitKnowledgesForm = async () => {
  // 表單送出時，因為後端要收到的是 FormData 的資料型態，所以要建立一個 FormData 物件
  const fd = new FormData()
  // 要把東西放進去 FormData 要使用 .append(key, value)，例如：fd.append('name', form.name)
  // 可以一行一行寫，也可以一個 for 迴圈搞定
  for (const key in knowledgesForm) {
    if (['_id', 'idx', 'dialog'].includes(key)) continue
    else if (key === 'image') {
      for (const image of knowledgesForm.image) {
        fd.append(key, image)
      }
    } else {
      fd.append(key, knowledgesForm[key])
    }
  }
  const object = {}
  fd.forEach((val, key) => {
    object[key] = val
  })
  console.log(object)
  try {
    if (knowledgesForm._id.length === 0) {
      const { data } = await apiAuth.post('/knowledges', fd)
      knowledges.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '新增成功',
        text: '您已成功新增一筆靈學知識！'
      })
      initKnowledges()
    } else {
      const { data } = await apiAuth.patch('/knowledges/' + knowledgesForm._id, fd)
      knowledges[knowledgesForm.idx] = data.result
      Swal.fire({
        icon: 'success',
        title: '修改成功',
        text: '您已成功修改該筆靈學知識！'
      })
      initKnowledges()
    }
    knowledgesForm.dialog = false
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '新增失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}// 案例分享送出表單
const submitCasesForm = async () => {
  // 表單送出時，因為後端要收到的是 FormData 的資料型態，所以要建立一個 FormData 物件
  const fd = new FormData()
  // 要把東西放進去 FormData 要使用 .append(key, value)，例如：fd.append('name', form.name)
  // 可以一行一行寫，也可以一個 for 迴圈搞定
  for (const key in casesForm) {
    if (['_id', 'idx', 'dialog'].includes(key)) continue
    else if (key === 'image') {
      for (const image of casesForm.image) {
        fd.append(key, image)
      }
    } else {
      fd.append(key, casesForm[key])
    }
  }
  const object = {}
  fd.forEach((val, key) => {
    object[key] = val
  })
  console.log(object)
  try {
    if (casesForm._id.length === 0) {
      const { data } = await apiAuth.post('/cases', fd)
      cases.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '新增成功',
        text: '您已成功新增一筆案例分享！'
      })
      initCases()
    } else {
      const { data } = await apiAuth.patch('/cases/' + casesForm._id, fd)
      cases[casesForm.idx] = data.result
      Swal.fire({
        icon: 'success',
        title: '修改成功',
        text: '您已成功修改該筆案例分享！'
      })
      initCases()
    }
    casesForm.dialog = false
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '新增失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}

// 預設 刪除簡介文章的彈窗 為 false
const deleteIntroductionDialog = reactive({
  dialog: false
})
/*
  定義一個變數，用來將 form 裡面的 _id 帶入 deleteArtcle 的 function 裡
  又，因為開啟 刪除簡介的彈窗 的按鈕放在 #body-cell-edit="edit" 裡
  所以才會寫 @click='openDeleteDialog(edit.row._id)'
*/
const delIntroduction = reactive({
  _id: '',
  title: ''
})
/*
  開啟 刪除簡介文章的彈窗，並帶入值
  此時 del.value = edit.row._id = articleId
*/
const openDeleteIntroductionDialog = (articleId, articleTitle) => {
  delIntroduction._id = articleId
  delIntroduction.title = articleTitle
  deleteIntroductionDialog.dialog = true
}
// 預設 刪除最新消息的彈窗 為 false
const deleteNewsDialog = reactive({
  dialog: false
})
/*
  定義一個變數，用來將 form 裡面的 _id 帶入 deleteArtcle 的 function 裡
  又，因為開啟 刪除最新消息的彈窗 的按鈕放在 #body-cell-edit="edit" 裡
  所以才會寫 @click='openDeleteDialog(edit.row._id)'
*/
const delnews = reactive({
  _id: '',
  title: ''
})
/*
  開啟 刪除最新消息的彈窗，並帶入值
  此時 del.value = edit.row._id = newsId
*/
const openDeleteNewsDialog = (newsId, newsTitle) => {
  delnews._id = newsId
  delnews.title = newsTitle
  deleteNewsDialog.dialog = true
}
// 預設 刪除靈學知識的彈窗 為 false
const deleteKnowledgesDialog = reactive({
  dialog: false
})
/*
  定義一個變數，用來將 form 裡面的 _id 帶入 deleteArtcle 的 function 裡
  又，因為開啟 刪除靈學知識的彈窗 的按鈕放在 #body-cell-edit="edit" 裡
  所以才會寫 @click='openDeleteDialog(edit.row._id)'
*/
const delknowledges = reactive({
  _id: '',
  title: ''
})
/*
  開啟 刪除靈學知識的彈窗，並帶入值
  此時 del.value = edit.row._id = knowledgesId
*/
const openDeleteKnowledgesDialog = (knowledgesId, knowledgesTitle) => {
  delknowledges._id = knowledgesId
  delknowledges.title = knowledgesTitle
  deleteKnowledgesDialog.dialog = true
}
// 預設 刪除案例分享的彈窗 為 false
const deleteCasesDialog = reactive({
  dialog: false
})
/*
  定義一個變數，用來將 form 裡面的 _id 帶入 deleteArtcle 的 function 裡
  又，因為開啟 刪除案例分享的彈窗 的按鈕放在 #body-cell-edit="edit" 裡
  所以才會寫 @click='openDeleteDialog(edit.row._id)'
*/
const delCases = reactive({
  _id: '',
  title: ''
})
/*
  開啟 刪除案例分享的彈窗，並帶入值
  此時 del.value = edit.row._id = casesId
*/
const openDeleteCasesDialog = (casesId, casesTitle) => {
  delCases._id = casesId
  delCases.title = casesTitle
  deleteCasesDialog.dialog = true
}

/*
  刪除簡介
  透過 deleteProduct(del) 將 最原始的 form._id 帶入 function
  form._id = edit.row._id = del.value = productId
*/
const deleteIntroduction = async (articleId) => {
  deleteIntroductionDialog.dialog = false
  try {
    await apiAuth.delete('/introduction/' + articleId)
    await Swal.fire({
      icon: 'success',
      title: '刪除成功',
      text: '您已成功刪除該筆本所簡介！'
    })
    initIntroduction()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '刪除失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
/*
  刪除最新消息
  透過 deleteProduct(del) 將 最原始的 form._id 帶入 function
  form._id = edit.row._id = del.value = productId
*/
const deleteNews = async (newsId) => {
  deleteNewsDialog.dialog = false
  try {
    await apiAuth.delete('/newses/' + newsId)
    await Swal.fire({
      icon: 'success',
      title: '刪除成功',
      text: '您已成功刪除該筆最新消息！'
    })
    initNewses()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '刪除失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
/*
  刪除靈學知識
  透過 deleteProduct(del) 將 最原始的 form._id 帶入 function
  form._id = edit.row._id = del.value = productId
*/
const deleteKnowledges = async (knowledgesId) => {
  deleteKnowledgesDialog.dialog = false
  try {
    await apiAuth.delete('/knowledges/' + knowledgesId)
    await Swal.fire({
      icon: 'success',
      title: '刪除成功',
      text: '您已成功刪除該筆靈學知識！'
    })
    initKnowledges()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '刪除失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
/*
  刪除案例分享
  透過 deleteProduct(del) 將 最原始的 form._id 帶入 function
  form._id = edit.row._id = del.value = productId
*/
const deleteCases = async (casesId) => {
  deleteCasesDialog.dialog = false
  try {
    await apiAuth.delete('/cases/' + casesId)
    await Swal.fire({
      icon: 'success',
      title: '刪除成功',
      text: '您已成功刪除該筆案例分享！'
    })
    initCases()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '刪除失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}

// 開啟簡介表單
const openIntroductionDialog = (_id, idx) => {
  introductionForm._id = _id
  // console.log(introduction[idx])
  if (idx > -1) {
    // 有 id => 編輯
    introductionForm.title = introduction[idx].title
    introductionForm.content = introduction[idx].content
  } else {
    // 沒 id => 清空
    introductionForm.title = ''
    introductionForm.content = ''
  }
  introductionForm.image = []
  introductionForm.idx = idx
  introductionForm.dialog = true
}
// 開啟最新消息表單
const openNewsesDialog = (_id, idx) => {
  newsForm._id = _id
  // console.log(newses[idx])
  if (idx > -1) {
    // 有 id => 編輯
    newsForm.title = newses[idx].title
    newsForm.content = newses[idx].content
    newsForm.show = newses[idx].show
  } else {
    // 沒 id => 清空
    newsForm.title = ''
    newsForm.content = ''
    newsForm.show = false
  }
  newsForm.idx = idx
  newsForm.dialog = true
}
// 開啟靈學知識表單
const openKnowledgesDialog = (_id, idx) => {
  knowledgesForm._id = _id
  // console.log(knowledges[idx])
  if (idx > -1) {
    // 有 id => 編輯
    knowledgesForm.title = knowledges[idx].title
    knowledgesForm.content = knowledges[idx].content
    knowledgesForm.show = knowledges[idx].show
  } else {
    // 沒 id => 清空
    knowledgesForm.title = ''
    knowledgesForm.content = ''
    knowledgesForm.show = false
  }
  knowledgesForm.image = []
  knowledgesForm.idx = idx
  knowledgesForm.dialog = true
}
// 開啟案例分享表單
const opencasesDialog = (_id, idx) => {
  casesForm._id = _id
  // console.log(cases[idx])
  if (idx > -1) {
    // 有 id => 編輯
    casesForm.title = cases[idx].title
    casesForm.content = cases[idx].content
    casesForm.show = cases[idx].show
  } else {
    // 沒 id => 清空
    casesForm.title = ''
    casesForm.content = ''
    casesForm.show = false
  }
  casesForm.image = []
  casesForm.idx = idx
  casesForm.dialog = true
}

// 簡介表頭
const columnsIntroduction = [
  { name: 'title', label: '簡介標題', field: row => row.title, align: 'center' },
  { name: 'content', label: '簡介內容', field: row => row.content, align: 'left' },
  { name: 'edit', label: '簡介編輯', align: 'center' }
]
// 最新消息表頭
const columnsNewses = [
  { name: 'date', label: '發布日期', field: row => row.date, align: 'center' },
  { name: 'title', label: '消息標題', field: row => row.title, align: 'center' },
  { name: 'show', label: '上架狀態', field: row => row.show ? '已發布' : '未發布', align: 'center' },
  { name: 'edit', label: '消息編輯', align: 'center' }
]
// 靈學知識表頭
const columnsKnowledges = [
  { name: 'date', label: '發布日期', field: row => row.date, align: 'center' },
  { name: 'title', label: '文章標題', field: row => row.title, align: 'center' },
  { name: 'show', label: '上架狀態', field: row => row.show ? '已發布' : '未發布', align: 'center' },
  { name: 'edit', label: '文章編輯', align: 'center' }
]
// 案例分享表頭
const columnsCases = [
  { name: 'date', label: '發布日期', field: row => row.date, align: 'center' },
  { name: 'title', label: '文章標題', field: row => row.title, align: 'center' },
  { name: 'show', label: '上架狀態', field: row => row.show ? '已發布' : '未發布', align: 'center' },
  { name: 'edit', label: '文章編輯', align: 'center' }
]

// 抓資料庫本所簡介的資料
const initIntroduction = async () => {
  try {
    const { data } = await apiAuth.get('/introduction/all')
    introduction.splice(0, introduction.length)
    introduction.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
initIntroduction()
// 抓資料庫最新消息的資料
const initNewses = async () => {
  try {
    const { data } = await apiAuth.get('/newses/all')
    newses.splice(0, newses.length)
    newses.push(...data.result)
    newses.reverse()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
initNewses()
// 抓資料庫靈學知識的資料
const initKnowledges = async () => {
  try {
    const { data } = await apiAuth.get('/knowledges/all')
    knowledges.splice(0, knowledges.length)
    knowledges.push(...data.result)
    knowledges.reverse()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
initKnowledges()
// 抓資料庫案例分享的資料
const initCases = async () => {
  try {
    const { data } = await apiAuth.get('/cases/all')
    cases.splice(0, cases.length)
    cases.push(...data.result)
    cases.reverse()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
initCases()

</script>
