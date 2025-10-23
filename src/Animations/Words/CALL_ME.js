export const CALL_ME = (ref) => {
  if (ref.callMeDone) return;

  const animationsForward = [];

  // حركة الذراع جنب الوجه (رفع متوسط)
  animationsForward.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 6, "+"]);  
  animationsForward.push(["mixamorigRightArm", "rotation", "z", Math.PI / 8, "+"]);  
  animationsForward.push(["mixamorigRightForeArm", "rotation", "x", -Math.PI / 8, "-"]); 
  animationsForward.push(["mixamorigRightHand", "rotation", "y", Math.PI / 15, "+"]);  
  animationsForward.push(["mixamorigRightHand", "rotation", "z", -Math.PI / 30, "+"]);

  ["Index", "Middle", "Ring"].forEach(finger => {
    for (let i = 1; i <= 3; i++) {
      animationsForward.push([`mixamorigRightHand${finger}${i}`, "rotation", "z", Math.PI / 2, "+"]);
    }
  });

  animationsForward.push(["mixamorigRightHandThumb1", "rotation", "y", -Math.PI / 4, "+"]);
  animationsForward.push(["mixamorigRightHandThumb2", "rotation", "y", -Math.PI / 6, "+"]);

  animationsForward.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "+"]);
  animationsForward.push(["mixamorigRightHandPinky2", "rotation", "z", 0, "+"]);
  animationsForward.push(["mixamorigRightHandPinky3", "rotation", "z", 0, "+"]);

  ref.animations.push(animationsForward);

  if (!ref.pending) {
    ref.pending = true;
    ref.animate();

    setTimeout(() => {
      const returnToRest = [
        ["mixamorigRightArm", "rotation", "x", -Math.PI / 190, "-"],  // نزّل الذراع شوية تحت
        ["mixamorigRightArm", "rotation", "z", Math.PI / 3, "-"],   // قرب الذراع أكتر للموديل
        ["mixamorigRightForeArm", "rotation", "y", Math.PI / 1.5, "-"],

        ["mixamorigRightHand", "rotation", "y", 0, "-"],
        ["mixamorigRightHand", "rotation", "z", 0, "-"],

        ...["Thumb", "Index", "Middle", "Ring", "Pinky"].flatMap(finger => {
          const fingerReturn = [];
          for (let i = 1; i <= 3; i++) {
            fingerReturn.push([`mixamorigRightHand${finger}${i}`, "rotation", "z", 0, "-"]);
          }
          if (finger === "Thumb") {
            fingerReturn.push(["mixamorigRightHandThumb1", "rotation", "y", 0, "-"]);
            fingerReturn.push(["mixamorigRightHandThumb2", "rotation", "y", 0, "-"]);
          }
          return fingerReturn;
        }),
      ];

      ref.animations.push(returnToRest);
      ref.animate(() => {
        ref.pending = false;
        ref.callMeDone = true;
      });
    }, 1000);
  }
};
