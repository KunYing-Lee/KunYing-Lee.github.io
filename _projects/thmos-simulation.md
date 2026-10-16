---
layout: page
title: TH-MOS Simulation — Robot Sports
description: A Unity–MuJoCo platform for humanoid soccer simulation and evaluation.
permalink: /projects/thmos-simulation/
selected: true
modal_id: thmos-simulation
eyebrow: TH-MOS · Simulation & Evaluation
dialog_intro: An interactive environment connecting humanoid skills, perception, and team decisions. Unity presents the match while native MuJoCo owns the physical motion and contacts.
metrics:
  - value: 3v3 & 5v5
    label: Autonomous humanoid soccer
  - value: Unity + MuJoCo
    label: Visualization and native physics
  - value: Full stack
    label: Perception · Skills · Decisions
media:
  - path: /assets/video/projects/robot-sports-simulation.mp4
    poster: /assets/img/projects/robot-sports-simulation.jpg
    label: Simulation
    title: Robot Sports match demonstration
highlights:
  - title: Physics and control
    text: Integrated learned locomotion, kicking, and recovery controllers into a shared MuJoCo world with Unity visualization.
  - title: Perception and decisions
    text: Designed modular decision-to-skill interfaces and per-robot perception pipelines combining YOLO detection with particle-filter-based localization.
  - title: Match evaluation
    text: Integrated the HSL GameController and configurable communication latency and packet loss for team-policy evaluation.
ongoing: Self-play multi-agent reinforcement learning for team decision-making, starting from MAPPO.
importance: -1
category: work
role: Platform Developer · TH-MOS Robot Soccer Team
summary: Built a Unity–MuJoCo platform for autonomous 3v3 and 5v5 humanoid soccer, connecting learned locomotion, kicking, and recovery with perception, team decisions, and match management.
preview_video: /assets/video/projects/robot-sports-simulation.mp4
poster: /assets/img/projects/robot-sports-simulation.jpg
preview_label: Simulation · Robot Sports
---

**Role:** Platform Developer, TH-MOS Robot Soccer Team, Tsinghua University.

I developed Robot Sports to connect humanoid control and team decision-making in an interactive soccer environment. The platform combines Unity visualization with native MuJoCo physics and supports autonomous 3v3 and 5v5 matches.

{% include project_video.liquid path="/assets/video/projects/robot-sports-simulation.mp4" poster="/assets/img/projects/robot-sports-simulation.jpg" label="Simulation" title="Robot Sports match demonstration" %}

## Platform contributions

- **Physics and control:** integrated learned locomotion, kicking, and recovery controllers into a shared MuJoCo world, with Unity displaying the resulting physical motion.
- **Perception and decisions:** designed modular decision-to-skill interfaces and per-robot perception pipelines combining YOLO-based object detection with particle-filter-based localization.
- **Match evaluation:** integrated the HSL GameController and configurable communication latency and packet loss to support team-policy evaluation under different match conditions.

## Ongoing work

I am investigating self-play multi-agent reinforcement learning for team decision-making, starting from MAPPO.

[Back to projects]({{ '/' | relative_url }}#projects)
