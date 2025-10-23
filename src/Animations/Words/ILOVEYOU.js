export const ILOVEYOU = (ref) => {
  let animationsForward = [];
  let animationsReverse = [];

  // المرحلة 1: رفع الذراع والكف مع تدوير بسيط
  animationsForward.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 1, "+"]);
  animationsForward.push(["mixamorigRightForeArm", "rotation", "x", -Math.PI / 5, "-"]);
  animationsForward.push(["mixamorigRightHand", "rotation", "y", Math.PI / 30, "+"]);
  animationsForward.push(["mixamorigRightHand", "rotation", "x", -Math.PI / 50, "+"]);
  animationsForward.push(["mixamorigRightHand", "rotation", "z", -Math.PI / 10, "+"]);

  // المرحلة 2: فتح السبابة والخنصر، ثني البنصر والوسطى، وتدوير الإبهام
  ["Index", "Pinky"].forEach(finger => {
    for (let i = 1; i <= 3; i++) {
      animationsForward.push([`mixamorigRightHand${finger}${i}`, "rotation", "z", 0, "+"]);
    }
  });

  ["Middle", "Ring"].forEach(finger => {
    for (let i = 1; i <= 3; i++) {
      animationsForward.push([`mixamorigRightHand${finger}${i}`, "rotation", "z", Math.PI / 2.5, "+"]);
    }
  });

  animationsForward.push(["mixamorigRightHandThumb1", "rotation", "y", Math.PI / 10, "+"]);

  // المرحلة 3: العودة للوضع الطبيعي (تفريد كل الأصابع والكف والذراع)
  animationsReverse = [
    ["mixamorigRightArm", "rotation", "x", 0, "-"],
    ["mixamorigRightForeArm", "rotation", "x", 0, "+"],
    ["mixamorigRightHand", "rotation", "x", 0, "+"],
    ["mixamorigRightHand", "rotation", "y", 0, "+"],
    ["mixamorigRightHand", "rotation", "z", 0, "+"],
    ...["Thumb", "Index", "Middle", "Ring", "Pinky"].flatMap(finger =>
      [1, 2, 3].flatMap(i => ([
        [`mixamorigRightHand${finger}${i}`, "rotation", "x", 0, "-"],
        [`mixamorigRightHand${finger}${i}`, "rotation", "y", 0, "-"],
        [`mixamorigRightHand${finger}${i}`, "rotation", "z", 0, "-"],
      ]))
    ),
  ];

  // تنفيذ الحركة
  ref.animations.push(animationsForward);

  // إضافة تأخير زمني قبل العودة (مثلاً 1.5 ثانية)
  setTimeout(() => {
    ref.animations.push(animationsReverse);
    if (!ref.pending) {
      ref.pending = true;
      ref.animate(() => {
        ref.pending = false;
      });
    }
  }, 1500);
};
