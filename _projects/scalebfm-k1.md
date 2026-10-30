---
layout: page
title: "ScaleBFM-K1: Large-Scale Humanoid Motion Tracking"
description: Model-based motion tracking and large-scale training for Booster K1.
permalink: /projects/scalebfm-k1/
selected: true
github: https://github.com/KunYing-Lee/ScaleBFM-K1
importance: -4
category: work
summary: Adapted ScaleBFM-based motion tracking to the 22-DoF Booster K1, achieving over 95% full-clip completion on the BONES-SEED test set after 5 hours of training on a single node with 8 NVIDIA A10 GPUs. Built and validated a large-scale BONES-SEED/LAFAN1 motion-data pipeline with morphology-consistent conversion and differentiable kinematics.
preview_video: /assets/video/projects/scalebfm-k1-demo.mp4
poster: /assets/img/projects/scalebfm-k1-demo.jpg
---

Adapted ScaleBFM-based motion tracking to the **22-DoF Booster K1**, achieving **over 95% full-clip completion on the BONES-SEED test set after 5 hours of training on a single node with 8 NVIDIA A10 GPUs**.

{% include project_video.liquid path="/assets/video/projects/scalebfm-k1-demo.mp4" poster="/assets/img/projects/scalebfm-k1-demo.jpg" label="Simulation" title="K1 motion-tracking demonstrations" controls=true %}

## Implementation

- Adapted robot dynamics, state representations, joint/body mappings, and differentiable forward kinematics for K1; verified kinematic consistency against MuJoCo.
- Built and validated a motion-data pipeline spanning 142,220 BONES-SEED clips and 77 LAFAN1 clips, including morphology-consistent conversion, corpus packing, and train/evaluation partitioning.
- Configured distributed training on eight GPUs and released the K1 training, evaluation, and export workflow.

Based on [ScaleBFM](https://github.com/zengweishuai/ScaleBFM), [ScaleBFM_Plus](https://github.com/Hxxxz0/ScaleBFM_Plus), and [SuperMimic](https://github.com/KunYing-Lee/SuperMimic).

[Code](https://github.com/KunYing-Lee/ScaleBFM-K1) · [Back to projects]({{ '/' | relative_url }}#projects)
