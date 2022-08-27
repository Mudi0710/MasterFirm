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
        <div class="text-h5 text-accent q-my-sm" style="height:40px; line-height: 1.6em;">首頁宣傳文案</div>
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

                      <q-btn class="col-auto text-secondary" style="font-size: xx-small; padding: 0px 8px;"
                        @click='openSloganDialog(card.row._id, card.rowIndex)' outline>修改文案</q-btn>
                    </div>
                    <div class="col-12 row justify-end q-mt-sm">
                      <q-btn class="col-auto text-secondary" style="font-size: xx-small; padding: 0px 8px;"
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
              <!-- 宣傳圖片 -->
              <p class="text-h6 text-dark">文案圖片</p>
              <q-file v-model='sloganForm.image' multiple :rules='[rules.size]' accept='image/*' filled bottom-slots
                counter>
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
            <div class="col-12 text-center text-h6 text-dark q-pb-md">你確定要刪除【{{ delSlogan.title }}】文案嗎？<br>刪除【{{
              delSlogan.title
              }}】文案將無法復原！</div>
            <div class="col-12 row justify-around">
              <!-- 確定刪除 -->
              <q-btn @click="deleteSlogan(delSlogan._id)" square flat class="col-4 bg-secondary text-dark q-my-sm"
                label="確定刪除" />
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
            <div class="col-6 col-md-4 col-lg-3 q-pa-sm cursor-pointer ">
              <q-card square bordered class="bg-primary shadow" style="width: 100%;height: 100%;">
                <div v-for="col in card.cols" :key="col.name" class="q-pa-sm">
                  <!-- <pre>{{ col }}</pre> -->
                  <!-- 聯絡資訊 icon -->
                  <div v-if="col.name === 'icon'" class="row justify-between">
                    <span class="col-12 text-accent">{{ col.label }}：</span>
                    <span class="col-12 text-right text-secondary ellipsis" style="max-width: 300px;">{{ col.value
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

                      <q-btn class="col-auto text-secondary" style="font-size: xx-small; padding: 0px 8px;"
                        @click='openConnectionDialog(card.row._id, card.rowIndex)' outline>修改資訊</q-btn>
                    </div>
                    <div class="col-12 row justify-end q-mt-sm">
                      <q-btn class="col-auto text-secondary" style="font-size: xx-small; padding: 0px 8px;"
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
              <p class="text-h6 text-dark">聯絡資訊 Icon</p>
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
            <div class="col-12 text-center text-h6 text-dark q-pb-md">你確定要刪除【{{ delConnection.title }}】聯絡資訊嗎？<br>刪除【{{
              delConnection.title
              }}】聯絡資訊將無法復原！</div>
            <div class="col-12 row justify-around">
              <!-- 確定刪除 -->
              <q-btn @click="deleteConnection(delConnection._id)" square flat
                class="col-4 bg-secondary text-dark q-my-sm" label="確定刪除" />
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
                    <span class="col-12 text-secondary ellipsis-3-lines" style="max-width: 300px;">{{ col.value
                      }}</span>
                  </div>
                  <!-- 聯絡資訊編輯 -->
                  <div v-if="col.name === 'edit'" class="row justify-start">
                    <!-- <pre>{{ card.rowIndex }}</pre> -->

                    <div class="col-12 row justify-between">
                      <span class="text-accent">{{ col.label }}：</span>

                      <q-btn class="col-auto text-secondary" style="font-size: xx-small; padding: 0px 8px;"
                        @click='openLocalmapDialog(card.row._id, card.rowIndex)' outline>修改地圖</q-btn>
                    </div>
                    <div class="col-12 row justify-end q-mt-sm">
                      <q-btn class="col-auto text-secondary" style="font-size: xx-small; padding: 0px 8px;"
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
                label="確定刪除" />
              <!-- 取消刪除 -->
              <q-btn square flat outline class="col-4 bg-dark text-secondary q-my-sm" label="取消"
                @click='deleteLocalmapDialog.dialog = false' />
            </div>
          </q-card>
        </q-dialog>

        <!-- 輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片輪播圖片 -->

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

// 文案表單預設格式
const sloganForm = reactive({
  _id: '',
  title: '',
  subtitle: '',
  content: '',
  image: [],
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
  sloganForm.image = []
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

</script>
