import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { DocComponent } from '../../doc/doc.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MenuComponent, DocComponent, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  public deployed_menu: boolean = true;

  handleMenu() {
    const menu = document.getElementById('app-sidebar');
    const button = document.getElementById('app-menu-button-handle');

    if (!menu || !button) {
      return;
    }

    this.deployed_menu = !this.deployed_menu;

    if (this.deployed_menu) {
      button.style.left = '355px';
    } else {
      button.style.left = '60px';
    }

    menu.classList.toggle('hidden', !this.deployed_menu);
  }
}
