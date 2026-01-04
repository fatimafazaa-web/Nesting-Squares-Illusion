// إعداد المتغيرات الأساسية
const lineWidths = [1, 3, 6]; // سماكات الخطوط: رفيع، متوسط، سميك
const trialsPerCondition = 5;

// إنشاء قائمة المحاولات مع سماكات الخطوط عشوائياً
let trials = [];
for (let i = 0; i < trialsPerCondition; i++) {
    lineWidths.forEach(lw => trials.push({ lineWidth: lw }));
}
// خلط المحاولات عشوائياً
trials = jsPsych.randomization.shuffle(trials);

// تحميل مكتبة jsPsych إذا لم تكن محملة
// (في PsychoPy Online Builder، بيكون موجودة مسبقاً)

// تعريف المثيرات: مربعات متداخلة
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

// إعداد التجربة

const timeline = [];

trials.forEach(trial => {
    // مرحلة عرض المربعات
    timeline.push({
        type: 'html-keyboard-response',
        stimulus: `<canvas id="illusionCanvas" width="600" height="400" style="background-color: grey;"></canvas>`,
        choices: jsPsych.NO_KEYS,
        trial_duration: 1000,  // عرض المربعات لمدة 1 ثانية
        on_load: () => {
            const canvas = document.getElementById('illusionCanvas');
            const ctx = canvas.getContext('2d');
            drawSquares(ctx, trial.lineWidth);
        }
    });

    // مرحلة السؤال وجمع الإجابة
    timeline.push({
        type: 'html-keyboard-response',
        stimulus: `<p style="color:white; font-size: 24px;">هل تبدو المربعات منتظمة تمامًا؟<br>اضغط Y = نعم ، N = لا</p>`,
        choices: ['y', 'n'],
        data: { lineWidth: trial.lineWidth },
        on_finish: function(data){
            data.response = data.response;
        }
    });
});

// إعداد jsPsych وتشغيل التجربة
const jsPsych = initJsPsych({
    on_finish: function () {
        jsPsych.data.displayData();
    }
});

jsPsych.run(timeline);
