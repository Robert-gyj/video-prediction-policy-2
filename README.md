# Video Prediction Policy 2

Static paper website. Open index.html or serve this folder to preview.

Upload the entire vpp2.github.io folder to publish. All displayed images, videos, CSS, and JavaScript are included with relative paths. Google Fonts is optional; local system fonts are the fallback.

Comparison videos are in media/videos/instruction-comparison/. All are 3 seconds at 30 fps. The first group (003–005) uses 416×240 for all three models; the second group uses 320×240 for Wan/Cosmos and 416×240 for VPP2. The latest 068 Wan source has been processed again.

Abstract and model architecture remain to be added in index.html.

The second module contains 10 human-hand videos from fig6 and 10 robot-arm videos from fig7, sorted by filename in five-column grids. Videos are in media/videos/open-environment/. All are 4 seconds at 30 fps, 416×240. Instruction captions are intentionally empty in index.html.

Act Better starts with One-Step Video for Fast Inference: examples 002, 005, 035, 042, 039, 088, 107, 115 in the requested order. Before/after clips are included in media/videos/distillation/ at 416×240 and 4 seconds. The pretraining/after-distillation videos play synchronously in four vertically stacked pairs per row, with shared labels on the left.
