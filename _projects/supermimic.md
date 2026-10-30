---
layout: page
title: "SuperMimic on mjlab: Model-Based Humanoid Motion Tracking"
description: Differentiable-world-model motion tracking on native MuJoCo-Warp.
permalink: /projects/supermimic/
selected: true
modal_id: supermimic
eyebrow: Robot Learning · Model-Based Control
role: Open-Source Implementation & Extension
dialog_intro: Reproduced SuperMimic’s differentiable-world-model approach to humanoid motion tracking on native MuJoCo-Warp through mjlab, achieving 100% full-clip completion across 40 LAFAN1 motions within 5 hours of training on a single RTX 5090. Extended the motion library to highly dynamic MotionCode sequences.
links:
  - label: Original paper
    url: https://arxiv.org/abs/2610.28480
  - label: Code
    url: https://github.com/KunYing-Lee/SuperMimic
metrics:
  - value: 100%
    label: Full-clip completion · 40 LAFAN1 motions
  - value: ≤ 5 hours
    label: Training · Single RTX 5090
  - value: MotionCode
    label: Highly dynamic motion extension
media:
  - path: /assets/video/projects/supermimic-jumping-kick.mp4
    poster: /assets/img/projects/supermimic-jumping-kick.jpg
    label: MotionCode · Simulation
    title: Jumping kick with reference overlay
  - path: /assets/video/projects/supermimic-kungfu.mp4
    poster: /assets/img/projects/supermimic-kungfu.jpg
    label: MotionCode · Simulation
    title: Kung fu sequence with reference overlay
  - path: /assets/video/projects/supermimic-fall-recovery.mp4
    poster: /assets/img/projects/supermimic-fall-recovery.jpg
    label: LAFAN1 · Simulation
    title: Fall and recovery with reference overlay
highlights:
  - title: Native mjlab implementation
    text: Adapted world-model learning and differentiable policy rollouts to the native MuJoCo-Warp backend, with consistent body-frame observations and goal-conditioned termination modeling.
  - title: Motion-library expansion
    text: Integrated mixed-frame-rate motion data and state-preserving checkpoint migration to extend training from LAFAN1 to highly dynamic MotionCode sequences.
  - title: Full-clip evaluation
    text: Built evaluation tools that measure motion completion and tracking quality separately. Videos show selected policy rollouts alongside the blue reference motion.
importance: -3
category: work
summary: Reproduced SuperMimic’s differentiable-world-model approach to humanoid motion tracking on native MuJoCo-Warp through mjlab, achieving 100% full-clip completion across 40 LAFAN1 motions within 5 hours of training on a single RTX 5090. Extended the motion library to highly dynamic MotionCode sequences.
preview_video: /assets/video/projects/supermimic-jumping-kick.mp4
poster: /assets/img/projects/supermimic-jumping-kick.jpg
preview_label: Simulation · MotionCode jumping kick
---

{% include project_links.liquid project=page %}

Reproduced [SuperMimic](https://arxiv.org/abs/2610.28480)’s differentiable-world-model approach to humanoid motion tracking on native MuJoCo-Warp through mjlab, achieving **100% full-clip completion across 40 LAFAN1 motions within 5 hours of training on a single RTX 5090**. Extended the motion library to highly dynamic MotionCode sequences.

{% for video in page.media %}
{% include project_video.liquid path=video.path poster=video.poster label=video.label title=video.title controls=true %}
{% endfor %}

## Implementation and evaluation

{% for highlight in page.highlights %}
- **{{ highlight.title }}:** {{ highlight.text }}
{% endfor %}

[Back to projects]({{ '/' | relative_url }}#projects)
