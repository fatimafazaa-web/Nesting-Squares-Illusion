/***********************
 * تهيئة jsPsych
 ***********************/
const jsPsych = initJsPsych({
  on_finish: function () {
    jsPsych.data.displayData();
  }
});

/***********************
 * إعداد المتغيرات
 ***********************/
const lineWidths = [1, 3, 6]; // سماكات الخط
const trialsPerCondition = 5;

/***********************
 * إنشاء المحاولات
 ***********************/
let trials = [];
for (let i = 0; i < trialsPerCondition; i++) {
  lineWidths.forEach(lw => {
    trials.push({ lineWidth: lw });
  });
}

// خلط المحاولات
trials = jsPsych.randomization.shuffle(trials);

/***********************
 * دالة رسم المربعات
 ***********************/
function drawSquares(ctx, lineWidth) {
  const centerX = ctx.canvas.width / 2;
  const centerY = ctx.canvas.height / 2;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = 'white';

  // مربع خارجي
  ctx.strokeRect(centerX - 100, centerY - 100, 200, 200);
  // مربع داخلي
  ctx.strokeRect(centerX - 60, centerY - 60, 120, 120);
}

/***********************
 * بناء الـ Timeline
 ***********************/
const timeline
