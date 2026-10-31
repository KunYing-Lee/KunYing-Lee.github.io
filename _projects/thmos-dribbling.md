---
layout: page
title: Dribbling
description: Whole-body humanoid dribbling with active vision on Booster K1.
permalink: /projects/thmos-dribbling/
selected: true
modal_id: thmos-dribbling
eyebrow: TH-MOS · Learning & Control
dialog_intro: Trained reference-free dribbling on Booster K1 using asymmetric PPO, jointly learning locomotion and head control from ball-velocity commands, proprioception, and camera-frame ball observations.
media:
  - path: /assets/video/projects/thmos-dribbling.mp4
    poster: /assets/img/projects/thmos-dribbling.jpg
    title: Dribbling on Booster K1
highlights:
  - title: Whole-body reinforcement learning
    text: Adapted Joga-style dribbling to all 22 K1 joints using asymmetric PPO, including learned head yaw and pitch control, without motion references or a separate tracker. The actor uses three frames of proprioception, velocity commands, and camera-frame ball observations.
  - title: Active vision and command curriculum
    text: Modeled camera field of view, ball visibility, and observation latency. A curriculum increases the frequency of command changes, with rewards for ball-velocity tracking, close ball control, and balance.
  - title: Simulation and deployment
    text: Built GPU-parallel training in Isaac Lab with Newton/MuJoCo-Warp, physical randomization, and ONNX export with consistent observations, joint ordering, and actuator limits. Demonstrated continuous dribbling on Booster K1 and in simulation.
importance: -2.5
category: work
summary: Trained reference-free dribbling on Booster K1 using asymmetric PPO, jointly learning locomotion and head control from ball-velocity commands, proprioception, and camera-frame ball observations.
preview_video: /assets/video/projects/thmos-dribbling.mp4
poster: /assets/img/projects/thmos-dribbling.jpg
---

Trained reference-free dribbling on Booster K1 using asymmetric PPO, jointly learning locomotion and head control from ball-velocity commands, proprioception, and camera-frame ball observations.

{% include project_video.liquid path="/assets/video/projects/thmos-dribbling.mp4" poster="/assets/img/projects/thmos-dribbling.jpg" title="Dribbling on Booster K1" controls=true %}

## Whole-body reinforcement learning

Reimplemented and adapted Joga-style dribbling to K1 with asymmetric PPO, jointly controlling all 22 joints, including head yaw and pitch. The actor uses three frames of proprioception, ball-velocity commands, and camera-frame ball observations; the critic receives additional physical state during training.

## Active vision and command curriculum

Modeled camera field of view, ball visibility, and observation latency. A curriculum increases the frequency of command changes, with rewards for ball-velocity tracking, close ball control, and balance.

## Simulation and deployment

Built GPU-parallel training in Isaac Lab with Newton/MuJoCo-Warp, physical randomization, and ONNX export with consistent observations, joint ordering, and actuator limits. The video shows continuous dribbling on Booster K1, four-view simulation, and a first-person demonstration.

[Back to projects]({{ '/' | relative_url }}#projects)
