---
layout: page
title: "SuperMimic on mjlab: Model-Based Humanoid Motion Tracking"
description: Differentiable-world-model motion tracking on native MuJoCo-Warp.
permalink: /projects/supermimic/
selected: true
github: https://github.com/KunYing-Lee/SuperMimic
media:
  - path: /assets/video/projects/supermimic-demo.mp4
    poster: /assets/img/projects/supermimic-demo.jpg
    label: Simulation · LAFAN1 & MotionCode
    title: Motion tracking and few-shot policy adaptation
highlights:
  - title: Native mjlab implementation
    text: Adapted world-model learning and differentiable policy rollouts to the native MuJoCo-Warp backend, with consistent body-frame observations and goal-conditioned termination modeling.
  - title: Few-shot policy adaptation
    text: Adapted the pretrained tracking policy to a small set of highly dynamic MotionCode motions through fine-tuning, with mixed-frame-rate data processing and state-preserving checkpoint migration.
  - title: Full-clip evaluation
    text: Built evaluation tools that measure motion completion and tracking quality separately. Videos show selected policy rollouts alongside the blue reference motion.
importance: -3
category: work
summary: Reproduced SuperMimic’s differentiable-world-model approach to humanoid motion tracking on native MuJoCo-Warp through mjlab, achieving 100% full-clip completion across 40 LAFAN1 motions within 5 hours of training on a single RTX 5090. Demonstrated few-shot adaptation to highly dynamic MotionCode motions.
preview_video: /assets/video/projects/supermimic-demo.mp4
poster: /assets/img/projects/supermimic-demo.jpg
---

Reproduced [SuperMimic](https://arxiv.org/abs/2610.28480)’s differentiable-world-model approach to humanoid motion tracking on native MuJoCo-Warp through mjlab, achieving **100% full-clip completion across 40 LAFAN1 motions within 5 hours of training on a single RTX 5090**. Demonstrated few-shot adaptation to highly dynamic MotionCode motions.

{% for video in page.media %}
{% include project_video.liquid path=video.path poster=video.poster label=video.label title=video.title controls=true %}
{% endfor %}

## Implementation and evaluation

{% for highlight in page.highlights %}
- **{{ highlight.title }}:** {{ highlight.text }}
{% endfor %}

[Back to projects]({{ '/' | relative_url }}#projects)
