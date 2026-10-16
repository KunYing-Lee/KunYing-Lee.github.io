---
layout: page
title: TH-MOS Gait & Soccer Skills
description: Learning and deploying locomotion, shooting, and fall recovery on Booster K1.
permalink: /projects/thmos-gait/
selected: true
importance: -2
category: work
role: Gait Control Group Lead · Decision-Making Algorithms Lead
summary: Developed and deployed learned soccer skills on Booster K1, from omnidirectional locomotion and target-conditioned shooting to fast fall recovery. Demonstrations include a RoboCup match goal, real-robot recovery, and shooting in simulation.
preview_video: /assets/video/projects/thmos-shooting-goal.mp4
poster: /assets/img/projects/thmos-shooting-goal.jpg
preview_label: Hardware · RoboCup match goal
---

**Role:** Gait Control Group Lead · Decision-Making Algorithms Lead, TH-MOS Robot Soccer Team, Tsinghua University.

I develop learning-based control for humanoid soccer, spanning command-conditioned adversarial motion priors (AMP), target-conditioned shooting, and fast fall recovery. My work includes policy training, simulation validation, and deployment on Booster K1.

## On the field

A goal scored during an international RoboCup match shows the shooting skill in a competitive setting.

{% include project_video.liquid path="/assets/video/projects/thmos-shooting-goal.mp4" poster="/assets/img/projects/thmos-shooting-goal.jpg" label="Hardware" title="Shooting goal at RoboCup" %}

## Recovery and shooting development

The recovery video shows physical robot testing; the shooting video shows the policy in simulation.

<div class="project-video-grid">
  {% include project_video.liquid path="/assets/video/projects/thmos-fall-recovery.mp4" poster="/assets/img/projects/thmos-fall-recovery.jpg" label="Hardware" title="Fall recovery on Booster K1" %}
  {% include project_video.liquid path="/assets/video/projects/thmos-shooting-simulation.mp4" poster="/assets/img/projects/thmos-shooting-simulation.jpg" label="Simulation" title="Target-conditioned shooting" %}
</div>

## Methods and hardware evaluation

- **Omnidirectional locomotion:** command-conditioned AMP for velocity tracking. Hardware tracking ranges reach −1.5 to +2.0 m/s forward/backward, −1.5 to +1.5 m/s laterally, and −1.7 to +1.7 rad/s in yaw.
- **Target-conditioned shooting:** policies aim at specified 3D coordinates within the goal mouth from positions across a 14 × 9 m field. Separate hardware tests achieved targeting errors within 10 cm in 27 of 30 trials.
- **Fall recovery:** an AMP-based policy trained in MJLab completed the transition from tested fallen poses to stable standing within 0.5 s, succeeding in all 30 hardware trials.

Current work explores onboard-perception-guided curved shots for obstacle avoidance.

[Back to projects]({{ '/' | relative_url }}#projects)
