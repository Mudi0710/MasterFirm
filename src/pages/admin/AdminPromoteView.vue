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
        <div class='col-auto text-h3 text-secondary q-my-sm q-pl-md'>推播管理</div>
        <!-- <q-btn @click="openDialog('', -1)" square flat
          class='col-auto q-mr-xl bg-secondary text-dark text-h6 q-my-sm createBtn'>新增會員</q-btn> -->
      </div>

      <!-- 內容區 -->
      <div class="q-pa-md">
        <!-- 首頁文案首頁文案首頁文案首頁文案首頁文案首頁文案首頁文案首頁文案首頁文案首頁文案首頁文案首頁文案首頁文案首頁文案首頁文案首頁文案 -->
        <div class="bg-accent text-h5 text-dark q-my-sm" style="height:1px;"></div>
        <div class="text-h5 text-accent q-my-sm" style="height:40px; line-height: 1.6em;">首頁文案</div>
        <q-table :grid="$q.screen.lt.xl" :columns="columnsslogan" :rows="slogan" row-key="title" separator="cell" square
          bordered wrap-cells binary-state-sort dense :filter="filter" :loading="loading" :pagination="paginationSlogan"
          rows-per-page-label="每頁顯示筆數" no-data-label="目前沒有新增任何宣傳文案" no-results-label="Oops...找不到該筆宣傳文案"
          class="bg-transparent">

          <!-- 新增宣傳文案按鈕 -->
          <template v-slot:top-left>
            <q-btn @click="openSloganDialog('', -1)" square flat :disable="slogan.length > 0"
              class='col-auto q-mr-xl bg-secondary text-dark text-body1 q-my-sm createBtn'>新增宣傳文案</q-btn>
          </template>

          <!-- 文案標題 -->
          <template #body-cell-title="title">
            <!-- <pre>{{ title.row.title }}</pre> -->
            <q-td :title="title" class="ellipsis" style="max-width: 150px;">
              {{ title.row.title }}
            </q-td>
          </template>

          <!-- 文案內容 -->
          <template #body-cell-subtitle="subtitle">
            <!-- <pre>{{ subtitle.row.subtitle }}</pre> -->
            <q-td :subtitle="subtitle" class="ellipsis" style="max-width: 400px;">{{ subtitle.row.subtitle }}
            </q-td>
          </template>

          <!-- 編輯文案 -->
          <template #body-cell-edit="edit">
            <q-td :edit="edit" style="max-width: 150px;">
              <!-- <pre>{{ edit }}</pre> -->
              <div class="row justify-center">
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='openSloganDialog(edit.row._id, edit.rowIndex)' outline>
                  修改文案</q-btn>
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='openDeleteSloganDialog(edit.row._id, edit.row.title)'
                  outline>
                  刪除文案</q-btn>
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
            <div class="col-12 col-lg-6 q-pa-sm cursor-pointer ">
              <q-card square bordered class="bg-primary shadow" style="width: 100%;">
                <div v-for="col in card.cols" :key="col.name" class="q-pa-sm">
                  <!-- <pre>{{ col }}</pre> -->
                  <!-- 文案標題、內容 -->
                  <div v-if="col.name !== 'edit'" class="row justify-between">
                    <span class="text-accent">{{ col.label }}：</span>
                    <span class="text-secondary ellipsis" style="max-width: 300px;">{{ col.value }}</span>
                  </div>
                  <!-- 文案編輯 -->
                  <div v-if="col.name === 'edit'" class="row justify-start">
                    <!-- <pre>{{ card.rowIndex }}</pre> -->

                    <div class="col-12 row justify-between">
                      <span class="text-accent">{{ col.label }}：</span>

                      <q-btn class="col-auto text-secondary" style="padding: 0px 8px;"
                        @click='openSloganDialog(card.row._id, card.rowIndex)' outline>修改文案</q-btn>
                    </div>
                    <div class="col-12 row justify-end q-my-sm" style="height: 28.8px;">
                      <q-btn class="col-auto text-secondary" style="padding: 0px 8px;"
                        @click='openDeleteSloganDialog(card.row._id, card.row.title)' outline>刪除文案</q-btn>
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

        <!-- 新增首頁宣傳文案時的彈出視窗 -->
        <q-dialog v-model="sloganForm.dialog" seamless>
          <q-card id="dialog" flat square bordered persistent v-if="sloganForm.dialog"
            class="bg-info text-secondary shadow-white">
            <q-form @submit.prevent='submitSloganForm' class="q-pa-md">
              <!-- 宣傳標題 -->
              <p class="text-h6 text-dark">文案標題</p>
              <q-input v-model="sloganForm.title" :rules='[rules.required]' type='text' outlined square dense />
              <!-- 宣傳副標 -->
              <p class="text-h6 text-dark">文案副標</p>
              <q-input v-model="sloganForm.subtitle" :rules='[rules.required]' type='text' outlined square dense />
              <!-- 宣傳內容 -->
              <p class="text-h6 text-dark">文案內容</p>
              <q-editor model="qeditor" v-model="sloganForm.content" ref="editorRef" @paste="onPaste"
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
                  @click='sloganForm.dialog = false' />
              </div>
            </q-form>
          </q-card>
        </q-dialog>

        <!-- 刪除首頁宣傳文章時的彈出視窗 -->
        <q-dialog v-model="deleteSloganDialog.dialog" seamless persistent>
          <q-card square class="row justify-center bg-info q-pa-lg">
            <div class="col-12 text-center text-h3 text-red q-pb-md">警告</div>
            <div class="col-12 text-center text-h6 text-dark q-pb-md">你確定要刪除<br>【{{ delSlogan.title }}】嗎？<br>刪除將無法復原！
            </div>
            <div class="col-12 row justify-around">
              <!-- 確定刪除 -->
              <q-btn @click="deleteSlogan(delSlogan._id)" square flat class="col-4 bg-secondary text-dark q-my-sm"
                label="刪除" />
              <!-- 取消刪除 -->
              <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
                @click='deleteSloganDialog.dialog = false' />
            </div>
          </q-card>
        </q-dialog>

        <!-- 聯絡資訊聯絡資訊聯絡資訊聯絡資訊聯絡資訊聯絡資訊聯絡資訊聯絡資訊聯絡資訊聯絡資訊聯絡資訊聯絡資訊聯絡資訊聯絡資訊聯絡資訊聯絡資訊 -->
        <div class="bg-accent text-h5 text-dark q-my-sm" style="height:1px;"></div>
        <div class="text-h5 text-accent q-my-sm" style="height:40px; line-height: 1.6em;">聯絡資訊</div>
        <q-table :grid="$q.screen.lt.xl" :columns="columnsConnections" :rows="connections" row-key="title"
          separator="cell" square bordered wrap-cells binary-state-sort dense :filter="filter" :loading="loading"
          :pagination="paginationConnection" rows-per-page-label="每頁顯示筆數" no-data-label="目前沒有新增任何聯絡資訊"
          no-results-label="Oops...找不到該筆宣傳聯絡資訊" class="bg-transparent">

          <!-- 新增宣傳聯絡資訊按鈕 -->
          <template v-slot:top-left>
            <q-btn @click="openConnectionDialog('', -1)" square flat
              class='col-auto q-mr-xl bg-secondary text-dark text-body1 q-my-sm createBtn'>新增聯絡資訊</q-btn>
          </template>

          <!-- Icon -->
          <template #body-cell-icon="icon">
            <q-td :img="icon" align="center" ellipsis>
              <!-- <pre>{{ icon.row }}</pre> -->
              <!-- <div class="row justify-center content-center"
                style="border: 3px solid; border-radius: 50%; width: 70px; height: 70px;"> -->
              <q-icon :name="icon.row.icon" size="xl" />
              <!-- </div> -->
            </q-td>
          </template>

          <!-- 編輯聯絡資訊 -->
          <template #body-cell-edit="edit">
            <q-td :edit="edit" style="max-width: 150px;">
              <!-- <pre>{{ edit }}</pre> -->
              <div class="row justify-center">
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='openConnectionDialog(edit.row._id, edit.rowIndex)'
                  outline>
                  修改資訊</q-btn>
                <q-btn class="col-auto q-mx-sm q-my-xs"
                  @click='openDeleteConnectionDialog(edit.row._id, edit.row.title)' outline>
                  刪除資訊</q-btn>
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
            <div class="col-12 col-md-4 col-lg-3 q-pa-sm cursor-pointer ">
              <q-card square bordered class="bg-primary shadow" style="width: 100%;height: 100%;">
                <div v-for="col in card.cols" :key="col.name" class="q-pa-sm">
                  <!-- <pre>{{ col }}</pre> -->
                  <!-- 聯絡資訊 icon -->
                  <div v-if="col.name === 'icon'" class="row justify-between">
                    <span class="col-auto text-accent">{{ col.label }}：</span>
                    <span class="col-auto text-right text-secondary text-wrap q-mr-auto" style="max-width: 300px;">{{
                        col.value
                    }}</span>
                  </div>
                  <!-- 聯絡資訊標題 -->
                  <div v-if="col.name === 'title'" class="row justify-between">
                    <span class="text-accent">{{ col.label }}：</span>
                    <span class="text-secondary ellipsis" style="max-width: 300px;">{{ col.value }}</span>
                  </div>
                  <!-- 聯絡資訊編輯 -->
                  <div v-if="col.name === 'edit'" class="row justify-start">
                    <!-- <pre>{{ card.rowIndex }}</pre> -->

                    <div class="col-12 row justify-between">
                      <span class="text-accent">{{ col.label }}：</span>

                      <q-btn class="col-auto text-secondary" style="padding: 0px 8px;"
                        @click='openConnectionDialog(card.row._id, card.rowIndex)' outline>修改資訊</q-btn>
                    </div>
                    <div class="col-12 row justify-end q-my-sm" style="height: 28.8px;">
                      <q-btn class="col-auto text-secondary" style="padding: 0px 8px;"
                        @click='openDeleteConnectionDialog(card.row._id, card.row.title)' outline>刪除資訊</q-btn>
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

        <!-- 新增聯絡資訊時的彈出視窗 -->
        <q-dialog v-model="connectionForm.dialog" seamless>
          <q-card id="dialog" flat square bordered persistent v-if="connectionForm.dialog"
            class="bg-info text-secondary shadow-white">
            <q-form @submit.prevent='submitConnectionForm' class="q-pa-md">
              <!-- 聯絡資訊 icon -->
              <p class="text-h6 text-dark">聯絡資訊 Icon<a href="http://fontawesome.com/search?m=free"
                  target="_blank">&nbsp;這邊找</a></p>
              <q-input v-model="connectionForm.icon" :rules='[rules.required]' type='text' outlined square dense />
              <!-- 聯絡資訊標題 -->
              <p class="text-h6 text-dark">聯絡資訊標題</p>
              <q-input v-model="connectionForm.title" :rules='[rules.required]' type='text' outlined square dense />
              <!-- 聯絡資訊內容 -->
              <p class="text-h6 text-dark">聯絡資訊內容</p>
              <q-editor model="qeditor" v-model="connectionForm.content" ref="editorRef" @paste="onPaste"
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
                  @click='connectionForm.dialog = false' />
              </div>
            </q-form>
          </q-card>
        </q-dialog>

        <!-- 刪除首頁宣傳文章時的彈出視窗 -->
        <q-dialog v-model="deleteConnectionDialog.dialog" seamless persistent>
          <q-card square class="row justify-center bg-info q-pa-lg">
            <div class="col-12 text-center text-h3 text-red q-pb-md">警告</div>
            <div class="col-12 text-center text-h6 text-dark q-pb-md">你確定要刪除<br>【{{ delConnection.title
            }}】嗎？<br>刪除將無法復原！</div>
            <div class="col-12 row justify-around">
              <!-- 確定刪除 -->
              <q-btn @click="deleteConnection(delConnection._id)" square flat
                class="col-4 bg-secondary text-dark q-my-sm" label="刪除" />
              <!-- 取消刪除 -->
              <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
                @click='deleteConnectionDialog.dialog = false' />
            </div>
          </q-card>
        </q-dialog>

        <!-- 聯絡地圖聯絡地圖聯絡地圖聯絡地圖聯絡地圖聯絡地圖聯絡地圖聯絡地圖聯絡地圖聯絡地圖聯絡地圖聯絡地圖聯絡地圖聯絡地圖聯絡地圖聯絡地圖 -->
        <div class="bg-accent text-h5 text-dark q-my-sm" style="height:1px;"></div>
        <div class="text-h5 text-accent q-my-sm" style="height:40px; line-height: 1.6em;">聯絡地圖</div>
        <q-table :grid="$q.screen.lt.xl" :columns="columnsLocalmap" :rows="localmap" row-key="title" separator="cell"
          square bordered wrap-cells binary-state-sort dense :filter="filter" :loading="loading"
          :pagination="paginationLocalmap" rows-per-page-label="每頁顯示筆數" no-data-label="目前沒有新增任何聯絡地圖"
          no-results-label="Oops...找不到該筆宣傳聯絡地圖" class="bg-transparent">

          <!-- 新增聯絡地圖按鈕 -->
          <template v-slot:top-left>
            <q-btn @click="openLocalmapDialog('', -1)" square flat :disable="localmap.length > 0"
              class='col-auto q-mr-xl bg-secondary text-dark text-body1 q-my-sm createBtn'>新增聯絡地圖</q-btn>
          </template>

          <!-- 編輯聯絡資訊 -->
          <template #body-cell-localmap="localmap">
            <q-td :localmap="localmap" style="max-width: 150px;">
              <!-- <pre>{{ localmap }}</pre> -->
              <div class="ellipsis-3-lines">{{ localmap.row.localmap }}</div>
            </q-td>
          </template>

          <!-- 編輯聯絡資訊 -->
          <template #body-cell-edit="edit">
            <q-td :edit="edit" style="max-width: 150px;">
              <!-- <pre>{{ edit }}</pre> -->
              <div class="row justify-center">
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='openLocalmapDialog(edit.row._id, edit.rowIndex)'
                  outline>
                  修改地圖</q-btn>
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='openDeleteLocalmapDialog(edit.row._id)' outline>
                  刪除地圖</q-btn>
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
            <div class="col-12 col-lg-6 q-pa-sm cursor-pointer ">
              <q-card square bordered class="bg-primary shadow" style="width: 100%;height: 100%;">
                <div v-for="col in card.cols" :key="col.name" class="q-pa-sm">
                  <!-- <pre>{{ col }}</pre> -->
                  <!-- 聯絡地圖 -->
                  <div v-if="col.name === 'localmap'" class="row justify-between">
                    <span class="col-12 text-accent">{{ col.label }}：</span>
                    <span class="col-12 text-secondary text-wrap" style="width: 100%;">{{ col.value
                    }}</span>
                  </div>
                  <!-- 聯絡資訊編輯 -->
                  <div v-if="col.name === 'edit'" class="row justify-start">
                    <!-- <pre>{{ card.rowIndex }}</pre> -->

                    <div class="col-12 row justify-between">
                      <span class="text-accent">{{ col.label }}：</span>

                      <q-btn class="col-auto text-secondary" style="padding: 0px 8px;"
                        @click='openLocalmapDialog(card.row._id, card.rowIndex)' outline>修改地圖</q-btn>
                    </div>
                    <div class="col-12 row justify-end q-my-sm" style="height: 28.8px;">
                      <q-btn class="col-auto text-secondary" style="padding: 0px 8px;"
                        @click='openDeleteLocalmapDialog(card.row._id)' outline>刪除地圖</q-btn>
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

        <!-- 新增聯絡資訊時的彈出視窗 -->
        <q-dialog v-model="localmapForm.dialog" seamless>
          <q-card id="dialog" flat square bordered persistent v-if="localmapForm.dialog"
            class="bg-info text-secondary shadow-white">
            <q-form @submit.prevent='submitLocalmapForm' class="q-pa-md">
              <!-- 聯絡地圖 -->
              <p class="text-h6 text-dark">聯絡地圖</p>
              <q-input v-model="localmapForm.localmap" :rules='[rules.required]' type='textarea' outlined square
                dense />

              <div class="row justify-around">
                <!-- 確定新增 -->
                <q-btn square flat type='submit' class="col-4 bg-secondary text-dark q-my-sm" label="送出編輯" />
                <!-- 取消新增 -->
                <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
                  @click='localmapForm.dialog = false' />
              </div>
            </q-form>
          </q-card>
        </q-dialog>

        <!-- 刪除首頁宣傳文章時的彈出視窗 -->
        <q-dialog v-model="deleteLocalmapDialog.dialog" seamless persistent>
          <q-card square class="row justify-center bg-info q-pa-lg">
            <div class="col-12 text-center text-h3 text-red q-pb-md">警告</div>
            <div class="col-12 text-center text-h6 text-dark q-pb-md">你確定要刪除聯絡地圖嗎？<br>刪除聯絡地圖將無法復原！</div>
            <div class="col-12 row justify-around">
              <!-- 確定刪除 -->
              <q-btn @click="deleteLocalmap(delLocalmap._id)" square flat class="col-4 bg-secondary text-dark q-my-sm"
                label="刪除" />
              <!-- 取消刪除 -->
              <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
                @click='deleteLocalmapDialog.dialog = false' />
            </div>
          </q-card>
        </q-dialog>

        <!-- 跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字跑馬文字 -->
        <div class="bg-accent text-h5 text-dark q-my-sm" style="height:1px;"></div>
        <div class="text-h5 text-accent q-my-sm" style="height:40px; line-height: 1.6em;">跑馬燈文字</div>
        <q-table :grid="$q.screen.lt.xl" :columns="columnsMarquee" :rows="marquee" row-key="title" separator="cell"
          square bordered wrap-cells binary-state-sort dense :filter="filter" :loading="loading"
          :pagination="paginationMarquee" rows-per-page-label="每頁顯示筆數" no-data-label="目前沒有新增任何跑馬燈"
          no-results-label="Oops...找不到該筆跑馬燈" class="bg-transparent">

          <!-- 新增跑馬燈按鈕 -->
          <template v-slot:top-left>
            <q-btn @click="openMarqueeDialog('', -1)" square flat :disable="marquee.length > 0"
              class='col-auto q-mr-xl bg-secondary text-dark text-body1 q-my-sm createBtn'>新增跑馬燈</q-btn>
          </template>

          <!-- 最新消息區 -->
          <template #body-cell-newsMarquee="newsMarquee">
            <q-td :newsMarquee="newsMarquee" class="text-wrap">
              {{ newsMarquee.row.newsMarquee }}
            </q-td>
          </template>

          <!-- 靈學知識區 -->
          <template #body-cell-knowledgesMarquee="knowledgesMarquee">
            <q-td :knowledgesMarquee="knowledgesMarquee" class="text-wrap">
              {{ knowledgesMarquee.row.knowledgesMarquee }}
            </q-td>
          </template>

          <!-- 案例分享區 -->
          <template #body-cell-casesMarquee="casesMarquee">
            <q-td :casesMarquee="casesMarquee" class="text-wrap">
              {{ casesMarquee.row.casesMarquee }}
            </q-td>
          </template>

          <!-- 編輯跑馬燈 -->
          <template #body-cell-edit="edit">
            <q-td :edit="edit" style="min-width: 150px;">
              <!-- <pre>{{ edit }}</pre> -->
              <div class="row justify-center">
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='openMarqueeDialog(edit.row._id, edit.rowIndex)' outline>
                  修改跑馬燈</q-btn>
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='openDeleteMarqueeDialog(edit.row._id, edit.row.title)'
                  outline>
                  刪除跑馬燈</q-btn>
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
            <div class="col-12 q-pa-sm cursor-pointer ">
              <q-card square bordered class="bg-primary shadow">
                <div v-for="col in card.cols" :key="col.name" class="q-pa-sm">
                  <!-- <pre>{{ col }}</pre> -->
                  <!-- 簡介標題、內容 -->
                  <div v-if="col.name !== 'edit'" class="row justify-between">
                    <span class="text-accent">{{ col.label }}：</span>
                    <span class="text-secondary ellipsis-3-lines">{{ col.value }}</span>
                  </div>
                  <!-- 簡介編輯 -->
                  <div v-if="col.name === 'edit'" class="row justify-start">
                    <!-- <pre>{{ card.rowIndex }}</pre> -->

                    <div class="col-12 row justify-between">
                      <span class="text-accent">{{ col.label }}：</span>

                      <q-btn class="col-auto text-secondary" style="font-size: small; padding: 0px 8px;"
                        @click='openMarqueeDialog(card.row._id, card.rowIndex)' outline>修改跑馬燈</q-btn>
                    </div>
                    <div class="col-12 row justify-end q-my-sm" style="height: 28.8px; ">
                      <q-btn class="col-auto text-secondary" style="font-size: small; padding: 0px 8px;"
                        @click='openDeleteMarqueeDialog(card.row._id, card.row.title)' outline>刪除跑馬燈</q-btn>
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

        <!-- 新增跑馬燈文章時的彈出視窗 -->
        <q-dialog v-model="marqueeForm.dialog" seamless>
          <q-card id="dialog" flat square bordered persistent v-if="marqueeForm.dialog"
            class="bg-info text-secondary shadow-white">
            <q-form @submit.prevent='submitMarqueeForm' class="q-pa-md">
              <!-- 最新消息區 -->
              <p class="text-h6 text-dark">最新消息區</p>
              <q-input v-model="marqueeForm.newsMarquee" :rules='[rules.required]' type='textarea' outlined square
                dense />
              <!-- 靈學知識區 -->
              <p class="text-h6 text-dark">靈學知識區</p>
              <q-input v-model="marqueeForm.knowledgesMarquee" :rules='[rules.required]' type='textarea' outlined square
                dense />
              <!-- 案例分享區 -->
              <p class="text-h6 text-dark">案例分享區</p>
              <q-input v-model="marqueeForm.casesMarquee" :rules='[rules.required]' type='textarea' outlined square
                dense />
              <!-- 商品描述 -->
              <!-- <p class="text-h6 text-dark">須知內容</p>
              <q-editor model="qeditor" v-model="marqueeForm.content" ref="editorRef" @paste="onPaste"
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
}" /> -->
              <div class="row justify-around">
                <!-- 確定新增 -->
                <q-btn square flat type='submit' class="col-4 bg-secondary text-dark q-my-sm" label="送出編輯" />
                <!-- 取消新增 -->
                <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
                  @click='marqueeForm.dialog = false' />
              </div>
            </q-form>
          </q-card>
        </q-dialog>

        <!-- 刪除跑馬燈文章時的彈出視窗 -->
        <q-dialog v-model="deleteMarqueeDialog.dialog" seamless persistent>
          <q-card square class="row justify-center bg-info q-pa-lg">
            <div class="col-12 text-center text-h3 text-red q-pb-md">警告</div>
            <div class="col-12 text-center text-h6 text-dark q-pb-md">你確定要刪除跑馬燈嗎？<br>刪除跑馬燈將無法復原！
            </div>
            <div class="col-12 row justify-around">
              <!-- 確定刪除 -->
              <q-btn @click="deleteMarquee(delMarquee._id)" square flat class="col-4 bg-secondary text-dark q-my-sm"
                label="刪除" />
              <!-- 取消刪除 -->
              <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
                @click='deleteMarqueeDialog.dialog = false' />
            </div>
          </q-card>
        </q-dialog>

        <!-- 輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片 -->
        <div class="bg-accent text-h5 text-dark q-my-sm" style="height:1px;"></div>
        <div class="text-h5 text-accent q-my-sm" style="height:40px; line-height: 1.6em;">輪播圖片</div>
        <q-table :grid="$q.screen.lt.xl" :columns="columnsCarousels" :rows="carousels" row-key="date" separator="cell"
          square bordered wrap-cells dense :filter="filter" :loading="loading" :pagination="paginationCarousels"
          rows-per-page-label="每頁顯示筆數" no-data-label="目前沒有新增任何輪播圖片" no-results-label="Oops...找不到該筆輪播圖片"
          class="bg-transparent">

          <!-- 新增輪播圖片按鈕 -->
          <template v-slot:top-left>
            <q-btn @click="openCarouselsDialog('', -1)" square flat :disable="carousels.length > 0"
              class='col-auto q-mr-xl bg-secondary text-dark text-body1 q-my-sm createBtn'>新增輪播圖片</q-btn>
          </template>

          <!-- 輪播圖片搜尋 -->
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="&nbsp;Search" class="search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <!-- 自定義表頭 -->
          <template v-slot:header="props">
            <q-tr :props="props" class="col-auto">
              <!-- <div>
                <marquee class="text-subtitle1 spacing-h6 text-accent">歡迎來我們這一家，充滿歡樂的這一家</marquee>
              </div> -->
            </q-tr>
          </template>

          <!-- 自定義內容 -->
          <template v-slot:body="props">
            <!-- <pre>{{ props }}</pre> -->
            <q-tr :props="props" class="col-auto row" style="min-height: 130px;height: auto;">
              <!-- 操作區 -->
              <div class="col-12 row justify-end q-mb-md">
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='openCarouselsDialog(props.row._id, props.rowIndex)'
                  outline>
                  修改圖片</q-btn>
                <q-btn class="col-auto q-mx-sm q-my-xs" @click='openDeleteCarouselsDialog(props.row._id)' outline>
                  刪除圖片</q-btn>
              </div>
              <!-- 首頁輪播圖（ 手機版 - 橫 ） -->
              <q-separator inset class="q-my-sm q-mx-auto" style="width:98%;" />
              <div class="col-12 row">
                <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">首頁輪播圖（ 手機版 - 橫 ）</div>
                <div v-for="(indexImageMobile, idx) in props.row.indexImageMobile" :key="indexImageMobile"
                  style="width: auto;">
                  <img :src="props.row.indexImageMobile[idx]" class="q-mx-md"
                    style="width: 200px;height: 150px; object-fit: cover;" :ratio="4 / 3">
                </div>
                <q-separator inset class="q-my-sm q-mx-auto" style="width:98%;" />
              </div>
              <!-- 首頁輪播圖（ 手機版 - 橫 ） -->
              <div class="col-12 row">
                <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">首頁輪播圖（ 電腦版 - 直 ）</div>
                <div v-for="(indexImageDesktop, idx) in props.row.indexImageDesktop" :key="indexImageDesktop"
                  style="width: auto;">
                  <img :src="props.row.indexImageDesktop[idx]" class="q-mx-md"
                    style="width: 150px;height: 200px; object-fit: cover;" :ratio="3 / 4">
                </div>
              </div>
              <!-- 最新消息輪播圖（ 手機版 - 橫 ） -->
              <q-separator inset class="q-my-sm q-mx-auto" style="width:98%;" />
              <div class="col-12 row">
                <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">最新消息輪播圖（ 手機版 - 橫 ）</div>
                <div v-for="(newsImageMobile, idx) in props.row.newsImageMobile" :key="newsImageMobile"
                  style="width: auto;">
                  <img :src="props.row.newsImageMobile[idx]" class="q-mx-md"
                    style="width: 200px;height: 150px; object-fit: cover;" :ratio="4 / 3">
                </div>
              </div>
              <!-- 最新消息輪播圖（ 手機版 - 橫 ） -->
              <q-separator inset class="q-my-sm q-mx-auto" style="width:98%;" />
              <div class="col-12 row">
                <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">最新消息輪播圖（ 電腦版 - 直 ）</div>
                <div v-for="(newsImageDesktop, idx) in props.row.newsImageDesktop" :key="newsImageDesktop"
                  style="width: auto;">
                  <img :src="props.row.newsImageDesktop[idx]" class="q-mx-md"
                    style="width: 150px;height: 200px; object-fit: cover;" :ratio="3 / 4">
                </div>
              </div>
              <!-- 靈學知識輪播圖（ 手機版 - 橫 ） -->
              <q-separator inset class="q-my-sm q-mx-auto" style="width:98%;" />
              <div class="col-12 row">
                <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">靈學知識輪播圖（ 手機版 - 橫 ）</div>
                <div v-for="(knowledgesImageMobile, idx) in props.row.knowledgesImageMobile"
                  :key="knowledgesImageMobile" style="width: auto;">
                  <img :src="props.row.knowledgesImageMobile[idx]" class="q-mx-md"
                    style="width: 200px;height: 150px; object-fit: cover;" :ratio="4 / 3">
                </div>
              </div>
              <!-- 靈學知識輪播圖（ 手機版 - 橫 ） -->
              <q-separator inset class="q-my-sm q-mx-auto" style="width:98%;" />
              <div class="col-12 row">
                <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">靈學知識輪播圖（ 電腦版 - 直 ）</div>
                <div v-for="(knowledgesImageDesktop, idx) in props.row.knowledgesImageDesktop"
                  :key="knowledgesImageDesktop" style="width: auto;">
                  <img :src="props.row.knowledgesImageDesktop[idx]" class="q-mx-md"
                    style="width: 150px;height: 200px; object-fit: cover;" :ratio="3 / 4">
                </div>
              </div>
              <!-- 案例分享輪播圖（ 手機版 - 橫 ） -->
              <q-separator inset class="q-my-sm q-mx-auto" style="width:98%;" />
              <div class="col-12 row">
                <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">案例分享輪播圖（ 手機版 - 橫 ）</div>
                <div v-for="(casesImageMobile, idx) in props.row.casesImageMobile" :key="casesImageMobile"
                  style="width: auto;">
                  <img :src="props.row.casesImageMobile[idx]" class="q-mx-md"
                    style="width: 200px;height: 150px; object-fit: cover;" :ratio="4 / 3">
                </div>
              </div>
              <!-- 案例分享輪播圖（ 手機版 - 橫 ） -->
              <q-separator inset class="q-my-sm q-mx-auto" style="width:98%;" />
              <div class="col-12 row">
                <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">案例分享輪播圖（ 電腦版 - 直 ）</div>
                <div v-for="(casesImageDesktop, idx) in props.row.casesImageDesktop" :key="casesImageDesktop"
                  style="width: auto;">
                  <img :src="props.row.casesImageDesktop[idx]" class="q-mx-md"
                    style="width: 150px;height: 200px; object-fit: cover;" :ratio="3 / 4">
                </div>
              </div>
            </q-tr>
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
            <div class="col-12 q-pa-sm cursor-pointer ">
              <q-card square bordered class="bg-primary shadow" style="width: 100%;">
                <div v-for="col in card.cols" :key="col.name" class="q-pa-sm">
                  <!-- 圖片編輯 -->
                  <div v-if="col.name === 'edit'" class="row justify-start">
                    <!-- <pre>{{ card.rowIndex }}</pre> -->
                    <div class="col-12 row justify-between">
                      <span class="text-h6 text-accent q-pl-sm">{{ col.label }}：</span>
                      <q-btn class="col-auto text-secondary" style="padding: 0px 8px;"
                        @click='openCarouselsDialog(card.row._id, card.rowIndex)' outline>修改圖片</q-btn>
                    </div>
                    <div class="col-12 row justify-end q-my-sm" style="height: 28.8px;">
                      <q-btn class="col-auto text-secondary" style="padding: 0px 8px;"
                        @click='openDeleteCarouselsDialog(card.row._id)' outline>刪除圖片</q-btn>
                    </div>
                    <q-separator inset class="q-my-sm q-mx-auto" style="width:98%;" />
                  </div>

                  <!-- 首頁輪播圖（ 手機版 - 橫 ） -->
                  <div v-if="col.name === 'indexImageMobile'" class="row justify-between">
                    <div class="col-12 row">
                      <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">首頁輪播圖（ 手機版 - 橫 ）</div>
                      <div v-for="(value, idx) in col.value" :key="value" style="width: auto;">
                        <img :src="col.value[idx]" class="col-12 q-mx-md"
                          style="width: 200px;height: 150px; object-fit: cover;" :ratio="4 / 3">
                      </div>
                      <q-separator inset class="q-my-sm q-mx-auto" style="width:98%;" />
                    </div>
                  </div>
                  <!-- 首頁輪播圖（ 電腦版 - 橫 ） -->
                  <div v-if="col.name === 'indexImageDesktop'" class="row justify-between">
                    <div class="col-12 row">
                      <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">首頁輪播圖（ 手機版 - 橫 ）</div>
                      <div v-for="(value, idx) in col.value" :key="value" style="width: auto;">
                        <img :src="col.value[idx]" class="col-12 q-mx-md"
                          style="width: 150px;height: 200px; object-fit: cover;" :ratio="3 / 4">
                      </div>
                      <q-separator inset class="q-my-sm q-mx-auto" style="width:98%;" />
                    </div>
                  </div>
                  <!-- 最新消息輪播圖（ 手機版 - 橫 ） -->
                  <div v-if="col.name === 'newsImageMobile'" class="row justify-between">
                    <div class="col-12 row">
                      <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">最新消息輪播圖（ 手機版 - 橫 ）</div>
                      <div v-for="(value, idx) in col.value" :key="value" style="width: auto;">
                        <img :src="col.value[idx]" class="col-12 q-mx-md"
                          style="width: 200px;height: 150px; object-fit: cover;" :ratio="4 / 3">
                      </div>
                      <q-separator inset class="q-my-sm q-mx-auto" style="width:98%;" />
                    </div>
                  </div>
                  <!-- 最新消息輪播圖（ 電腦版 - 橫 ） -->
                  <div v-if="col.name === 'newsImageDesktop'" class="row justify-between">
                    <div class="col-12 row">
                      <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">最新消息輪播圖（ 手機版 - 橫 ）</div>
                      <div v-for="(value, idx) in col.value" :key="value" style="width: auto;">
                        <img :src="col.value[idx]" class="col-12 q-mx-md"
                          style="width: 150px;height: 200px; object-fit: cover;" :ratio="3 / 4">
                      </div>
                      <q-separator inset class="q-my-sm q-mx-auto" style="width:98%;" />
                    </div>
                  </div>
                  <!-- 靈學知識輪播圖（ 手機版 - 橫 ） -->
                  <div v-if="col.name === 'knowledgesImageMobile'" class="row justify-between">
                    <div class="col-12 row">
                      <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">靈學知識輪播圖（ 手機版 - 橫 ）</div>
                      <div v-for="(value, idx) in col.value" :key="value" style="width: auto;">
                        <img :src="col.value[idx]" class="col-12 q-mx-md"
                          style="width: 200px;height: 150px; object-fit: cover;" :ratio="4 / 3">
                      </div>
                      <q-separator inset class="q-my-sm q-mx-auto" style="width:98%;" />
                    </div>
                  </div>
                  <!-- 靈學知識輪播圖（ 電腦版 - 橫 ） -->
                  <div v-if="col.name === 'knowledgesImageDesktop'" class="row justify-between">
                    <div class="col-12 row">
                      <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">靈學知識輪播圖（ 手機版 - 橫 ）</div>
                      <div v-for="(value, idx) in col.value" :key="value" style="width: auto;">
                        <img :src="col.value[idx]" class="col-12 q-mx-md"
                          style="width: 150px;height: 200px; object-fit: cover;" :ratio="3 / 4">
                      </div>
                      <q-separator inset class="q-my-sm q-mx-auto" style="width:98%;" />
                    </div>
                  </div>
                  <!-- 案例分享輪播圖（ 手機版 - 橫 ） -->
                  <div v-if="col.name === 'casesImageMobile'" class="row justify-between">
                    <div class="col-12 row">
                      <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">案例分享輪播圖（ 手機版 - 橫 ）</div>
                      <div v-for="(value, idx) in col.value" :key="value" style="width: auto;">
                        <img :src="col.value[idx]" class="col-12 q-mx-md"
                          style="width: 200px;height: 150px; object-fit: cover;" :ratio="4 / 3">
                      </div>
                      <q-separator inset class="q-my-sm q-mx-auto" style="width:98%;" />
                    </div>
                  </div>
                  <!-- 案例分享輪播圖（ 電腦版 - 橫 ） -->
                  <div v-if="col.name === 'casesImageDesktop'" class="row justify-between">
                    <div class="col-12 row">
                      <div class="col-12 text-h6 text-accent q-mb-sm q-pl-sm">案例分享輪播圖（ 手機版 - 橫 ）</div>
                      <div v-for="(value, idx) in col.value" :key="value" style="width: auto;">
                        <img :src="col.value[idx]" class="col-12 q-mx-md"
                          style="width: 150px;height: 200px; object-fit: cover;" :ratio="3 / 4">
                      </div>
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

        <!-- 新增輪播圖片時的彈出視窗 -->
        <q-dialog v-model="carouselForm.dialog" seamless>
          <q-card id="dialog" flat square bordered persistent v-if="carouselForm.dialog"
            class="bg-info text-secondary shadow-white">
            <q-form @submit.prevent='submitCarouselForm' class="q-pa-md">
              <!-- 首頁圖片(橫) -->
              <p class="text-h6 text-dark">首頁圖片（手機版-橫）</p>
              <q-file v-model='carouselForm.indexImageMobile' multiple :rules='[rules.size]' accept='image/*' filled
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
              <!-- 首頁圖片(直) -->
              <p class="text-h6 text-dark">首頁圖片（電腦版-直）</p>
              <q-file v-model='carouselForm.indexImageDesktop' multiple :rules='[rules.size]' accept='image/*' filled
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
              <!-- 最新消息圖片(橫) -->
              <p class="text-h6 text-dark">最新消息圖片（手機版-橫）</p>
              <q-file v-model='carouselForm.newsImageMobile' multiple :rules='[rules.size]' accept='image/*' filled
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
              <!-- 最新消息圖片(直) -->
              <p class="text-h6 text-dark">最新消息圖片（電腦版-直）</p>
              <q-file v-model='carouselForm.newsImageDesktop' multiple :rules='[rules.size]' accept='image/*' filled
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
              <!-- 靈學知識圖片(橫) -->
              <p class="text-h6 text-dark">靈學知識圖片（手機版-橫）</p>
              <q-file v-model='carouselForm.knowledgesImageMobile' multiple :rules='[rules.size]' accept='image/*'
                filled bottom-slots counter>
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
              <!-- 靈學知識圖片(直) -->
              <p class="text-h6 text-dark">靈學知識圖片（電腦版-直）</p>
              <q-file v-model='carouselForm.knowledgesImageDesktop' multiple :rules='[rules.size]' accept='image/*'
                filled bottom-slots counter>
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
              <!-- 案例分享圖片(橫) -->
              <p class="text-h6 text-dark">案例分享圖片（手機版-橫）</p>
              <q-file v-model='carouselForm.casesImageMobile' multiple :rules='[rules.size]' accept='image/*' filled
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
              <!-- 案例分享圖片(直) -->
              <p class="text-h6 text-dark">案例分享圖片（電腦版-直）</p>
              <q-file v-model='carouselForm.casesImageDesktop' multiple :rules='[rules.size]' accept='image/*' filled
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
                  @click='carouselForm.dialog = false' />
              </div>
            </q-form>
          </q-card>
        </q-dialog>

        <!-- 刪除輪播圖片文章時的彈出視窗 -->
        <q-dialog v-model="deleteCarouselsDialog.dialog" seamless persistent>
          <q-card square class="row justify-center bg-info q-pa-lg">
            <div class="col-12 text-center text-h3 text-red q-pb-md">警告</div>
            <div class="col-12 text-center text-h6 text-dark q-pb-md">你確定要刪除輪播圖片嗎？<br>刪除輪播圖片將無法復原！</div>
            <div class="col-12 row justify-around">
              <!-- 確定刪除 -->
              <q-btn @click="deleteCarousels(delCarousels._id)" square flat class="col-4 bg-secondary text-dark q-my-sm"
                label="刪除" />
              <!-- 取消刪除 -->
              <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
                @click='deleteCarouselsDialog.dialog = false' />
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

// 宣傳文案陣列
const slogan = reactive([])
// 聯絡資訊陣列
const connections = reactive([])
// 聯絡地圖陣列
const localmap = reactive([])
// 跑馬燈陣列
const marquee = reactive([])
// 輪播圖片陣列
const carousels = reactive([])

// 文案分頁
const paginationSlogan = reactive({
  items: [], // table要顯示的資料
  page: 1, // 目前第幾頁
  rowsPerPage: 0 // 每頁幾筆，0 代表 All
})
// 聯絡資訊分頁
const paginationConnection = reactive({
  items: [], // table要顯示的資料
  page: 1, // 目前第幾頁
  rowsPerPage: 0 // 每頁幾筆，0 代表 All
})
// 聯絡地圖分頁
const paginationLocalmap = reactive({
  items: [], // table要顯示的資料
  page: 1, // 目前第幾頁
  rowsPerPage: 0 // 每頁幾筆，0 代表 All
})
// 跑馬燈分頁
const paginationMarquee = reactive({
  items: [], // table要顯示的資料
  page: 1, // 目前第幾頁
  rowsPerPage: 0 // 每頁幾筆，0 代表 All
})
// 輪播圖片分頁
const paginationCarousels = reactive({
  items: [], // table要顯示的資料
  page: 1, // 目前第幾頁
  rowsPerPage: 0 // 每頁幾筆，0 代表 All
})

// 文案表單預設格式
const sloganForm = reactive({
  _id: '',
  title: '',
  subtitle: '',
  content: '',
  // image: [],
  idx: -1,
  dialog: false
})
// 聯絡資訊表單預設格式
const connectionForm = reactive({
  _id: '',
  icon: '',
  title: '',
  content: '',
  idx: -1,
  dialog: false
})
// 聯絡地圖表單預設格式
const localmapForm = reactive({
  _id: '',
  localmap: '',
  idx: -1,
  dialog: false
})
// 跑馬燈表單預設格式
const marqueeForm = reactive({
  newsMarquee: '',
  knowledgesMarquee: '',
  casesMarquee: '',
  idx: -1,
  dialog: false
})
// 輪播圖片表單預設格式
const carouselForm = reactive({
  _id: '',
  indexImageMobile: [],
  indexImageDesktop: [],
  newsImageMobile: [],
  newsImageDesktop: [],
  knowledgesImageMobile: [],
  knowledgesImageDesktop: [],
  casesImageMobile: [],
  casesImageDesktop: [],
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

// 文案送出表單
const submitSloganForm = async () => {
  // 表單送出時，因為後端要收到的是 FormData 的資料型態，所以要建立一個 FormData 物件
  const fd = new FormData()
  // 要把東西放進去 FormData 要使用 .append(key, value)，例如：fd.append('name', form.name)
  // 可以一行一行寫，也可以一個 for 迴圈搞定
  for (const key in sloganForm) {
    if (['_id', 'idx', 'dialog'].includes(key)) continue
    else if (key === 'image') {
      for (const image of sloganForm.image) {
        fd.append(key, image)
      }
    } else {
      fd.append(key, sloganForm[key])
    }
  }
  try {
    if (sloganForm._id.length === 0) {
      const { data } = await apiAuth.post('/slogan', fd)
      slogan.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '新增成功',
        text: '您已成功新增一筆宣傳文案！'
      })
      initSlogan()
    } else {
      const { data } = await apiAuth.patch('/slogan/' + sloganForm._id, fd)
      slogan[sloganForm.idx] = data.result
      Swal.fire({
        icon: 'success',
        title: '修改成功',
        text: '您已成功修改該筆宣傳文案！'
      })
      initSlogan()
    }
    sloganForm.dialog = false
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '新增失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
// 聯絡資訊送出表單
const submitConnectionForm = async () => {
  try {
    if (connectionForm._id.length === 0) {
      const { data } = await apiAuth.post('/connections', connectionForm)
      connections.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '新增成功',
        text: '您已成功新增一筆聯絡資訊！'
      })
      initConnections()
    } else {
      const { data } = await apiAuth.patch('/connections/' + connectionForm._id, connectionForm)
      connections[connectionForm.idx] = data.result
      Swal.fire({
        icon: 'success',
        title: '修改成功',
        text: '您已成功修改該筆聯絡資訊！'
      })
      initConnections()
    }
    connectionForm.dialog = false
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '新增失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
// 聯絡地圖送出表單
const submitLocalmapForm = async () => {
  try {
    if (localmapForm._id.length === 0) {
      const { data } = await apiAuth.post('/localmap', localmapForm)
      localmap.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '新增成功',
        text: '您已成功新增一筆聯絡地圖！'
      })
      initLocalmap()
    } else {
      const { data } = await apiAuth.patch('/localmap/' + localmapForm._id, localmapForm)
      localmap[localmapForm.idx] = data.result
      Swal.fire({
        icon: 'success',
        title: '修改成功',
        text: '您已成功修改該筆聯絡地圖！'
      })
      initLocalmap()
    }
    localmapForm.dialog = false
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '新增失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
// 跑馬燈送出表單
const submitMarqueeForm = async () => {
  try {
    if (marqueeForm._id.length === 0) {
      const { data } = await apiAuth.post('/marquees', marqueeForm)
      marquee.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '新增成功',
        text: '您已成功新增一筆跑馬燈！'
      })
      initMarquee()
    } else {
      const { data } = await apiAuth.patch('/marquees/' + marqueeForm._id, marqueeForm)
      marquee[marqueeForm.idx] = data.result
      Swal.fire({
        icon: 'success',
        title: '修改成功',
        text: '您已成功修改該筆跑馬燈！'
      })
      initMarquee()
    }
    marqueeForm.dialog = false
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '新增失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
// 輪播圖片送出表單
const submitCarouselForm = async () => {
  // 表單送出時，因為後端要收到的是 FormData 的資料型態，所以要建立一個 FormData 物件
  console.log(carouselForm)
  const fd = new FormData()
  // 要把東西放進去 FormData 要使用 .append(key, value)，例如：fd.append('name', form.name)
  // 可以一行一行寫，也可以一個 for 迴圈搞定
  for (const key in carouselForm) {
    if (['_id', 'idx', 'dialog'].includes(key)) continue
    else if (key === 'indexImageMobile') {
      for (const indexImageMobile of carouselForm.indexImageMobile) {
        fd.append(key, indexImageMobile)
      }
    } else if (key === 'indexImageDesktop') {
      for (const indexImageDesktop of carouselForm.indexImageDesktop) {
        fd.append(key, indexImageDesktop)
      }
    } else if (key === 'newsImageMobile') {
      for (const newsImageMobile of carouselForm.newsImageMobile) {
        fd.append(key, newsImageMobile)
      }
    } else if (key === 'newsImageDesktop') {
      for (const newsImageDesktop of carouselForm.newsImageDesktop) {
        fd.append(key, newsImageDesktop)
      }
    } else if (key === 'knowledgesImageMobile') {
      for (const knowledgesImageMobile of carouselForm.knowledgesImageMobile) {
        fd.append(key, knowledgesImageMobile)
      }
    } else if (key === 'knowledgesImageDesktop') {
      for (const knowledgesImageDesktop of carouselForm.knowledgesImageDesktop) {
        fd.append(key, knowledgesImageDesktop)
      }
    } else if (key === 'casesImageMobile') {
      for (const casesImageMobile of carouselForm.casesImageMobile) {
        fd.append(key, casesImageMobile)
      }
    } else if (key === 'casesImageDesktop') {
      for (const casesImageDesktop of carouselForm.casesImageDesktop) {
        fd.append(key, casesImageDesktop)
      }
    } else {
      fd.append(key, carouselForm[key])
    }
  }
  const object = {}
  fd.forEach((val, key) => {
    object[key] = val
  })
  console.log(object)
  try {
    if (carouselForm._id.length === 0) {
      const { data } = await apiAuth.post('/carousels', fd)
      carousels.push(data.result)
      Swal.fire({
        icon: 'success',
        title: '新增成功',
        text: '您已成功新增一筆輪播圖片！'
      })
      initCarousels()
    } else {
      const { data } = await apiAuth.patch('/carousels/' + carouselForm._id, fd)
      carousels[carouselForm.idx] = data.result
      Swal.fire({
        icon: 'success',
        title: '修改成功',
        text: '您已成功修改該筆輪播圖片！'
      })
      initCarousels()
    }
    carouselForm.dialog = false
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '新增失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}

// 預設 刪除宣傳文案的彈窗 為 false
const deleteSloganDialog = reactive({
  dialog: false
})
/*
  定義一個變數，用來將 form 裡面的 _id 帶入 deleteArtcle 的 function 裡
  又，因為開啟 刪除文案的彈窗 的按鈕放在 #body-cell-edit="edit" 裡
  所以才會寫 @click='openDeleteDialog(edit.row._id)'
*/
const delSlogan = reactive({
  _id: '',
  title: ''
})
/*
  開啟 刪除宣傳文案的彈窗，並帶入值
  此時 del.value = edit.row._id = articleId
*/
const openDeleteSloganDialog = (articleId, articleTitle) => {
  delSlogan._id = articleId
  delSlogan.title = articleTitle
  deleteSloganDialog.dialog = true
}
// 預設 刪除宣傳聯絡資訊的彈窗 為 false
const deleteConnectionDialog = reactive({
  dialog: false
})
/*
  定義一個變數，用來將 form 裡面的 _id 帶入 deleteArtcle 的 function 裡
  又，因為開啟 刪除聯絡資訊的彈窗 的按鈕放在 #body-cell-edit="edit" 裡
  所以才會寫 @click='openDeleteDialog(edit.row._id)'
*/
const delConnection = reactive({
  _id: '',
  title: ''
})
/*
  開啟 刪除宣傳聯絡資訊的彈窗，並帶入值
  此時 del.value = edit.row._id = articleId
*/
const openDeleteConnectionDialog = (connectionId, connectionTitle) => {
  delConnection._id = connectionId
  delConnection.title = connectionTitle
  deleteConnectionDialog.dialog = true
}
// 預設 刪除聯絡地圖的彈窗 為 false
const deleteLocalmapDialog = reactive({
  dialog: false
})
/*
  定義一個變數，用來將 form 裡面的 _id 帶入 deleteArtcle 的 function 裡
  又，因為開啟 刪除聯絡地圖的彈窗 的按鈕放在 #body-cell-edit="edit" 裡
  所以才會寫 @click='openDeleteDialog(edit.row._id)'
*/
const delLocalmap = reactive({
  _id: '',
  title: ''
})
/*
  開啟 刪除聯絡地圖的彈窗，並帶入值
  此時 del.value = edit.row._id = articleId
*/
const openDeleteLocalmapDialog = (localmapId) => {
  delLocalmap._id = localmapId
  deleteLocalmapDialog.dialog = true
}
// 預設 刪除輪播圖片的彈窗 為 false
const deleteCarouselsDialog = reactive({
  dialog: false
})
/*
  定義一個變數，用來將 form 裡面的 _id 帶入 deleteArtcle 的 function 裡
  又，因為開啟 刪除輪播圖片的彈窗 的按鈕放在 #body-cell-edit="edit" 裡
  所以才會寫 @click='openDeleteDialog(edit.row._id)'
*/
const delCarousels = reactive({
  _id: '',
  title: ''
})
// 預設 刪除跑馬燈的彈窗 為 false
const deleteMarqueeDialog = reactive({
  dialog: false
})
/*
  定義一個變數，用來將 form 裡面的 _id 帶入 deleteArtcle 的 function 裡
  又，因為開啟 刪除簡介的彈窗 的按鈕放在 #body-cell-edit="edit" 裡
  所以才會寫 @click='openDeleteDialog(edit.row._id)'
*/
const delMarquee = reactive({
  _id: '',
  title: ''
})
/*
  開啟 刪除跑馬燈的彈窗，並帶入值
  此時 del.value = edit.row._id = marqueeId
*/
const openDeleteMarqueeDialog = (marqueeId, marqueeTitle) => {
  delMarquee._id = marqueeId
  delMarquee.title = marqueeTitle
  deleteMarqueeDialog.dialog = true
}
/*
  開啟 刪除輪播圖片的彈窗，並帶入值
  此時 del.value = edit.row._id = carouselsId
*/
const openDeleteCarouselsDialog = (carouselsId) => {
  delCarousels._id = carouselsId
  deleteCarouselsDialog.dialog = true
}

/*
  刪除文案
  透過 deleteProduct(del) 將 最原始的 form._id 帶入 function
  form._id = edit.row._id = del.value = productId
*/
const deleteSlogan = async (articleId) => {
  deleteSloganDialog.dialog = false
  try {
    await apiAuth.delete('/slogan/' + articleId)
    await Swal.fire({
      icon: 'success',
      title: '刪除成功',
      text: '您已成功刪除該筆宣傳文案！'
    })
    initSlogan()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '刪除失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
/*
  刪除聯絡資訊
  透過 deleteProduct(del) 將 最原始的 form._id 帶入 function
  form._id = edit.row._id = del.value = productId
*/
const deleteConnection = async (connectionId) => {
  deleteConnectionDialog.dialog = false
  try {
    await apiAuth.delete('/connections/' + connectionId)
    await Swal.fire({
      icon: 'success',
      title: '刪除成功',
      text: '您已成功刪除該筆聯絡資訊！'
    })
    initConnections()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '刪除失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
/*
  刪除聯絡地圖
  透過 deleteProduct(del) 將 最原始的 form._id 帶入 function
  form._id = edit.row._id = del.value = productId
*/
const deleteLocalmap = async (localmapId) => {
  deleteLocalmapDialog.dialog = false
  try {
    await apiAuth.delete('/localmap/' + localmapId)
    await Swal.fire({
      icon: 'success',
      title: '刪除成功',
      text: '您已成功刪除該筆聯絡地圖！'
    })
    initLocalmap()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '刪除失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
/*
  刪除跑馬燈
  透過 deleteProduct(del) 將 最原始的 form._id 帶入 function
  form._id = edit.row._id = del.value = productId
*/
const deleteMarquee = async (marqueeId) => {
  deleteMarqueeDialog.dialog = false
  try {
    await apiAuth.delete('/marquees/' + marqueeId)
    await Swal.fire({
      icon: 'success',
      title: '刪除成功',
      text: '您已成功刪除該筆跑馬燈！'
    })
    initMarquee()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '刪除失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
/*
  刪除輪播圖片
  透過 deleteProduct(del) 將 最原始的 form._id 帶入 function
  form._id = edit.row._id = del.value = productId
*/
const deleteCarousels = async (carouselsId) => {
  deleteCarouselsDialog.dialog = false
  try {
    await apiAuth.delete('/carousels/' + carouselsId)
    await Swal.fire({
      icon: 'success',
      title: '刪除成功',
      text: '您已成功刪除該筆輪播圖片！'
    })
    initCarousels()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '刪除失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}

// 開啟聯絡資訊表單
const openConnectionDialog = (_id, idx) => {
  connectionForm._id = _id
  // console.log(connection[idx])
  if (idx > -1) {
    // 有 id => 編輯
    connectionForm.icon = connections[idx].icon
    connectionForm.title = connections[idx].title
    connectionForm.content = connections[idx].content
  } else {
    // 沒 id => 清空
    connectionForm.icon = ''
    connectionForm.title = ''
    connectionForm.content = ''
  }
  connectionForm.idx = idx
  connectionForm.dialog = true
}
// 開啟文案表單
const openSloganDialog = (_id, idx) => {
  sloganForm._id = _id
  // console.log(slogan[idx])
  if (idx > -1) {
    // 有 id => 編輯
    sloganForm.title = slogan[idx].title
    sloganForm.subtitle = slogan[idx].subtitle
    sloganForm.content = slogan[idx].content
  } else {
    // 沒 id => 清空
    sloganForm.title = ''
    sloganForm.subtitle = ''
    sloganForm.content = ''
  }
  // sloganForm.image = []
  sloganForm.idx = idx
  sloganForm.dialog = true
}
// 開啟聯絡地圖表單
const openLocalmapDialog = (_id, idx) => {
  localmapForm._id = _id
  // console.log(connection[idx])
  if (idx > -1) {
    // 有 id => 編輯
    localmapForm.localmap = localmap[idx].localmap
  } else {
    // 沒 id => 清空
    localmapForm.localmap = ''
  }
  localmapForm.idx = idx
  localmapForm.dialog = true
}
// 開啟跑馬燈表單
const openMarqueeDialog = (_id, idx) => {
  marqueeForm._id = _id
  // console.log(marquee[idx])
  if (idx > -1) {
    // 有 id => 編輯
    marqueeForm.newsMarquee = marquee[idx].newsMarquee
    marqueeForm.knowledgesMarquee = marquee[idx].knowledgesMarquee
    marqueeForm.casesMarquee = marquee[idx].casesMarquee
  } else {
    // 沒 id => 清空
    marqueeForm.newsMarquee = ''
    marqueeForm.knowledgesMarquee = ''
    marqueeForm.casesMarquee = ''
  }
  marqueeForm.idx = idx
  marqueeForm.dialog = true
}
// 開啟輪播圖片表單
const openCarouselsDialog = (_id, idx) => {
  carouselForm._id = _id
  // console.log(carousels[idx])
  if (idx > -1) {
    // 有 id => 編輯
    // carouselForm.indexImageMobile = carousels[idx].indexImageMobile
    // carouselForm.indexImageDesktop = carousels[idx].indexImageDesktop
    // carouselForm.newsImageMobile = carousels[idx].newsImageMobile
    // carouselForm.newsImageDesktop = carousels[idx].newsImageDesktop
    // carouselForm.knowledgesImageMobile = carousels[idx].knowledgesImageMobile
    // carouselForm.knowledgesImageDesktop = carousels[idx].knowledgesImageDesktop
    // carouselForm.casesImageMobile = carousels[idx].casesImageMobile
    // carouselForm.casesImageDesktop = carousels[idx].casesImageDesktop
  } else {
    // 沒 id => 清空
  }
  carouselForm.indexImageMobile = []
  carouselForm.indexImageDesktop = []
  carouselForm.newsImageMobile = []
  carouselForm.newsImageDesktop = []
  carouselForm.knowledgesImageMobile = []
  carouselForm.knowledgesImageDesktop = []
  carouselForm.casesImageMobile = []
  carouselForm.casesImageDesktop = []
  carouselForm.idx = idx
  carouselForm.dialog = true
}

// 宣傳表頭
const columnsslogan = [
  { name: 'title', label: '文案標題', field: row => row.title, align: 'center' },
  { name: 'subtitle', label: '文案副標', field: row => row.subtitle, align: 'center' },
  { name: 'edit', label: '文案編輯', align: 'center' }
]
// 聯絡資訊表頭
const columnsConnections = [
  { name: 'icon', label: 'Icon', field: row => row.icon, align: 'center' },
  { name: 'title', label: '標題', field: row => row.title, align: 'center' },
  { name: 'edit', label: '編輯', align: 'center' }
]
// 聯絡地圖表頭
const columnsLocalmap = [
  { name: 'localmap', label: '地圖', field: row => row.localmap, align: 'left' },
  { name: 'edit', label: '編輯', align: 'center' }
]
// 跑馬燈表頭
const columnsMarquee = [
  { name: 'newsMarquee', label: '最新消息', field: row => row.newsMarquee, align: 'left' },
  { name: 'knowledgesMarquee', label: '靈學知識', field: row => row.knowledgesMarquee, align: 'left' },
  { name: 'casesMarquee', label: '案例分享', field: row => row.casesMarquee, align: 'left' },
  { name: 'edit', label: '編輯跑馬燈', align: 'center' }
]
// 輪播圖片表頭
const columnsCarousels = [
  { name: 'edit', label: '圖片編輯', align: 'center' },
  { name: 'indexImageMobile', label: '首頁圖片(橫)', field: row => row.indexImageMobile, align: 'left' },
  { name: 'indexImageDesktop', label: '首頁圖片(直)', field: row => row.indexImageDesktop, align: 'left' },
  { name: 'newsImageMobile', label: '最新消息圖片(橫)', field: row => row.newsImageMobile, align: 'left' },
  { name: 'newsImageDesktop', label: '最新消息圖片(直)', field: row => row.newsImageDesktop, align: 'left' },
  { name: 'knowledgesImageMobile', label: '靈學知識圖片(橫)', field: row => row.knowledgesImageMobile, align: 'left' },
  { name: 'knowledgesImageDesktop', label: '靈學知識圖片(直)', field: row => row.knowledgesImageDesktop, align: 'left' },
  { name: 'casesImageMobile', label: '案例分享圖片(橫)', field: row => row.casesImageMobile, align: 'left' },
  { name: 'casesImageDesktop', label: '案例分享圖片(直)', field: row => row.casesImageDesktop, align: 'left' }
]

// 抓資料庫首頁宣傳文案的資料
const initSlogan = async () => {
  try {
    const { data } = await apiAuth.get('/slogan/all')
    slogan.splice(0, slogan.length)
    slogan.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
initSlogan()
// 抓資料庫宣傳聯絡資訊的資料
const initConnections = async () => {
  try {
    const { data } = await apiAuth.get('/connections/all')
    connections.splice(0, connections.length)
    connections.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
initConnections()
// 抓資料庫宣聯絡地圖的資料
const initLocalmap = async () => {
  try {
    const { data } = await apiAuth.get('/localmap/all')
    localmap.splice(0, localmap.length)
    localmap.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
initLocalmap()
// 抓資料庫跑馬燈的資料
const initMarquee = async () => {
  try {
    const { data } = await apiAuth.get('/marquees/all')
    marquee.splice(0, marquee.length)
    marquee.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
initMarquee()
// 抓資料庫輪播圖片的資料
const initCarousels = async () => {
  try {
    const { data } = await apiAuth.get('/carousels/all')
    carousels.splice(0, carousels.length)
    carousels.push(...data.result)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.isAxiosError ? error.response.data.message : error.message
    })
  }
}
initCarousels()

</script>
