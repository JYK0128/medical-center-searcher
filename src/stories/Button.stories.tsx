import React from 'react';
import { ComponentStory } from '@storybook/react';
import { Anime } from 'app/components/Content/Anime';
import { Button } from 'app/components/Content/Button';
import { Card } from 'app/components/Content/Card';
import { Form } from 'app/components/Content/Form';

export default {
  title: 'Atomic'
};

export const AtomicAnime: ComponentStory<typeof Anime> = () => <Anime />;
AtomicAnime.storyName = 'Anime';

export const AtomicButton: ComponentStory<typeof Button> = () => <Button />;
AtomicButton.storyName = 'Button';

export const AtomicCard: ComponentStory<typeof Card> = () => <Card />;
AtomicButton.storyName = 'Card';

export const AtomicForm: ComponentStory<typeof Form> = () => <Form />;
AtomicButton.storyName = 'Form';
