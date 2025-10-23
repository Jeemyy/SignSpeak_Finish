export const HELLO = (ref) => {
    let animations = [];

    // رفع اليد اليمنى إلى الأعلى
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 3, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", -Math.PI / 6, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "y", 0, "+"]); // البداية في المنتصف

    ref.animations.push(animations);

    // التلويح - لليسار
    animations = [];
    animations.push(["mixamorigRightHand", "rotation", "y", -Math.PI / 6, "-"]);
    ref.animations.push(animations);

    // التلويح - لليمين
    animations = [];
    animations.push(["mixamorigRightHand", "rotation", "y", Math.PI / 6, "+"]);
    ref.animations.push(animations);

    // التلويح - لليسار مرة أخرى
    animations = [];
    animations.push(["mixamorigRightHand", "rotation", "y", -Math.PI / 6, "-"]);
    ref.animations.push(animations);

    // الرجوع للوضع الطبيعي
    animations = [];
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);

    ref.animations.push(animations);

    if (ref.pending === false) {
        ref.pending = true;
        ref.animate();
    }
}
