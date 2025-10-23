export const DONE = (ref) => {
  let animationsForward = [];
  let animationsReverse = [];

  // تحريك الذراع للأمام والانثناء مع ميل بسيط للخارج
  animationsForward.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 8, "+"]); // تقليل الميل للأمام
  animationsForward.push(["mixamorigRightArm", "rotation", "z", Math.PI / 10, "+"]); // ميل الذراع للخارج
  animationsForward.push(["mixamorigRightForeArm", "rotation", "x", Math.PI / 6, "+"]);
  animationsForward.push(["mixamorigRightForeArm", "rotation", "y", -Math.PI / 15, "+"]);

  // لف المعصم قليلاً ليبدو كأن اليد تشير للأسفل
  animationsForward.push(["mixamorigRightHand", "rotation", "y", -Math.PI / 10, "+"]);
  animationsForward.push(["mixamorigRightHand", "rotation", "x", -Math.PI / 12, "+"]);
  animationsForward.push(["mixamorigRightHand", "rotation", "z", -Math.PI / 18, "+"]);

  // ثني الأصابع باستثناء الإبهام (وضع القبضة جزئيًا)
  ["Index", "Middle", "Ring", "Pinky"].forEach(finger => {
    for (let i = 1; i <= 3; i++) {
      animationsForward.push([`mixamorigRightHand${finger}${i}`, "rotation", "z", Math.PI / 2.5, "+"]);
    }
  });

  // تعديل وضع الإبهام ليكون قريب من راحة اليد
  animationsForward.push(["mixamorigRightHandThumb1", "rotation", "x", -Math.PI / 4, "+"]);
  animationsForward.push(["mixamorigRightHandThumb1", "rotation", "y", Math.PI / 18, "+"]);
  animationsForward.push(["mixamorigRightHandThumb2", "rotation", "x", -Math.PI / 6, "+"]);
  animationsForward.push(["mixamorigRightHandThumb3", "rotation", "x", -Math.PI / 8, "+"]);

  // العودة للوضع الطبيعي للأصابع بشكل كامل
  animationsReverse = [
    ["mixamorigRightArm", "rotation", "x", 0, "-"],
    ["mixamorigRightArm", "rotation", "z", 0, "+"],
    ["mixamorigRightForeArm", "rotation", "x", 0, "-"],
    ["mixamorigRightForeArm", "rotation", "y", 0, "+"],
    ["mixamorigRightHand", "rotation", "y", 0, "+"],
    ["mixamorigRightHand", "rotation", "x", 0, "+"],
    ["mixamorigRightHand", "rotation", "z", 0, "+"],
    ...["Index", "Middle", "Ring", "Pinky"].flatMap(finger =>
      [1, 2, 3].flatMap(i => ([
        [`mixamorigRightHand${finger}${i}`, "rotation", "x", 0, "-"],
        [`mixamorigRightHand${finger}${i}`, "rotation", "y", 0, "-"],
        [`mixamorigRightHand${finger}${i}`, "rotation", "z", 0, "-"],
      ]))
    ),
    ["mixamorigRightHandThumb1", "rotation", "x", 0, "-"],
    ["mixamorigRightHandThumb1", "rotation", "y", 0, "-"],
    ["mixamorigRightHandThumb2", "rotation", "x", 0, "-"],
    ["mixamorigRightHandThumb3", "rotation", "x", 0, "-"],
  ];

  // تنفيذ الحركة
  ref.animations.push(animationsForward);

  // إضافة تأخير زمني قبل العودة (مثلاً بعد 1.5 ثانية)
  setTimeout(() => {
    ref.animations.push(animationsReverse);
    if (!ref.pending) {
      ref.pending = true;
      ref.animate(() => {
        // لم يعد هناك استدعاء لوضع افتراضي
        ref.pending = false;
      });
    }
  }, 1500);
};
